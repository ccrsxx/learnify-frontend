'use client';

import { SiTelegram } from 'react-icons/si';
import { useRouter } from 'next/navigation';
import { useModal } from '@/lib/hooks/use-modal';
import { useCourse } from '@/lib/hooks/use-course';
import { CourseStats } from '@/components/course/course-stats';
import { VideoPlayer } from '@/components/ui/video-player';
import { CourseStudyCard } from '@/components/course/course-study-card';
import { CourseDetailsSkeleton } from '@/components/common/skeleton';
import { BackButton } from '@/components/ui/back-arrow';
import { PurchaseCourseModal } from '@/components/modal/purchase-course-modal';
import type { Course, CourseMaterial } from '@/lib/types/schema';

export default function Course({
  params: { slug }
}: {
  params: { slug: string[] };
}): JSX.Element {
  const router = useRouter();

  const [courseId, materialId] = slug;

  const { data: courseData, isLoading: courseLoading } = useCourse(courseId);

  const { open, openModal, closeModal } = useModal();

  const handleNextMaterial = (): void => {
    const course_materials = course_chapter.reduce<CourseMaterial[]>(
      (acc, { course_material }) => [...acc, ...course_material],
      []
    );

    const currentMaterialIndex = course_materials.findIndex(
      (material) => material.id === materialId
    );

    const nextMaterialId = course_materials[currentMaterialIndex + 1]?.id;

    const isPurchaseRequired =
      premium &&
      course_chapter.some(
        ({ course_material }, index) =>
          index && course_material.some(({ id }) => id === nextMaterialId)
      );

    if (isPurchaseRequired) openModal();
    else if (nextMaterialId)
      router.push(`/courses/${courseId}/${nextMaterialId}`);
  };

  const course = courseData?.data;

  if (courseLoading) return <CourseDetailsSkeleton />;

  if (!course)
    return (
      <section className='flex justify-center'>
        <h1 className='max-w-md p-4 font-medium text-black'>
          Course Not Found
        </h1>
      </section>
    );

  const {
    premium,
    telegram,
    intro_video,
    description,
    course_chapter,
    target_audience
  } = course;

  let selectedMaterialVideo: string | null = null;

  for (const { course_material } of course_chapter) {
    const material = course_material.find(({ id }) => id === materialId);

    if (material) {
      selectedMaterialVideo = material.video;
      break;
    }
  }

  const selectedVideo = selectedMaterialVideo ?? intro_video;

  return (
    <main className='grid gap-8 text-black'>
      <PurchaseCourseModal
        open={open}
        course={course}
        closeModal={closeModal}
      />
      <section className='bg-primary-blue-50'>
        <div className='layout grid gap-4 py-4'>
          <BackButton href='/courses' label='Kelas Lainnya' />
          <div className='grid max-w-xl gap-2'>
            <CourseStats details course={course} />
            <a
              className='clickable mr-auto flex items-center gap-4 rounded-high
                         bg-primary-alert-success px-6 py-2 text-white'
              href={telegram}
              target='_blank'
            >
              Join Group Telegram
              <SiTelegram />
            </a>
          </div>
        </div>
      </section>
      <section className='layout flex w-full gap-8'>
        <section className='mb-8 grid w-full max-w-xl shrink-0 gap-6'>
          <VideoPlayer
            src={selectedVideo}
            handleNextMaterial={handleNextMaterial}
          />
          <div className='grid gap-2'>
            <h2 className='text-xl font-bold'>Tentang Kelas</h2>
            <p className='whitespace-pre-line'>{description}</p>
          </div>
          <div className='grid gap-2'>
            <h2 className='text-xl font-bold'>Kelas Ini ditujukan Untuk</h2>
            <ol className='ml-4 grid list-decimal gap-1'>
              {target_audience.map((audience, index) => (
                <li key={index}>{audience}</li>
              ))}
            </ol>
          </div>
        </section>
        <section className='relative -top-56 w-full'>
          <CourseStudyCard
            course={course}
            selectedMaterialId={materialId}
            openModal={openModal}
          />
        </section>
      </section>
    </main>
  );
}
