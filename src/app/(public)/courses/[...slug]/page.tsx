'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { SiTelegram } from 'react-icons/si';
import { useModal } from '@/lib/hooks/use-modal';
import { useCourse } from '@/lib/hooks/query/use-course';
import { useMaterialStatus } from '@/lib/hooks/mutation/use-material-status';
import { CourseStats } from '@/components/course/course-stats';
import { VideoPlayer } from '@/components/ui/video-player';
import { CourseStudyCard } from '@/components/course/course-study-card';
import { CourseDetailsSkeleton } from '@/components/common/skeleton';
import { BackButton } from '@/components/ui/back-arrow';
import { PurchaseCourseModal } from '@/components/modal/purchase-course-modal';
import { EnrollCourseModal } from '@/components/modal/enroll-course-modal';
import { OnboardingModal } from '@/components/modal/onboarding-modal';
import { ImagePreview } from '@/components/modal/image-preview';
import type { Course, CourseMaterial } from '@/lib/types/schema';

export default function Course({
  params: { slug }
}: {
  params: { slug: string[] };
}): JSX.Element {
  const router = useRouter();

  const [courseId, materialId] = slug;

  const { updateMaterialStatusMutation } = useMaterialStatus();

  const { data: courseData, isLoading: courseLoading } = useCourse(courseId);

  const [currentMaterial, setCurrentMaterial] = useState<CourseMaterial | null>(
    () => getCourseMaterialById(courseData?.data, materialId)
  );

  const {
    open: enrollCourseModalOpen,
    openModal: openEnrollCourseModal,
    closeModal: closeEnrollCourseModal
  } = useModal();

  const {
    open: purchaseCourseModalOpen,
    openModal: openPurchaseCourseModal,
    closeModal: closePurchaseCourseModal
  } = useModal();

  const {
    open: onboardingModalOpen,
    openModal: openOnboardingModal,
    closeModal: closeOnboardingModal
  } = useModal();

  const course = courseData?.data;
  const courseEnrolled = typeof course?.total_completed_materials === 'number';

  useEffect(() => {
    if (!course || !materialId) return;

    const newCurrentMaterialId = getCourseMaterialById(course, materialId);

    if (!newCurrentMaterialId) {
      router.push(`/courses/${courseId}`, { scroll: false });
      return;
    }

    setCurrentMaterial(newCurrentMaterialId);
  }, [course, courseId, materialId, router]);

  useEffect(() => {
    if (!course || !courseEnrolled) return;

    const isOnboardingRequired = course.user_course?.[0]?.onboarded === false;

    if (!isOnboardingRequired) return;

    openOnboardingModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [course?.id, courseEnrolled]);

  if (courseLoading) return <CourseDetailsSkeleton />;

  if (!course)
    return (
      <section className='flex justify-center'>
        <h1 className='max-w-md p-4 font-medium text-black'>
          Kursus tidak ditemukan
        </h1>
      </section>
    );

  const {
    name,
    image,
    premium,
    telegram,
    intro_video,
    description,
    course_chapter,
    target_audience,
    course_category: { image: courseCategoryImage }
  } = course;

  const handleNextMaterial = async (): Promise<void> => {
    const isNotEnrolledOnFreeCourse = !courseEnrolled && !premium;

    if (isNotEnrolledOnFreeCourse) {
      openEnrollCourseModal();
      return;
    }

    const course_materials = course_chapter!.reduce<CourseMaterial[]>(
      (acc, { course_material }) => [...acc, ...course_material],
      []
    );

    const currentMaterialIndex = course_materials.findIndex(
      (material) => material.id === materialId
    );

    const nextMaterialId = course_materials[currentMaterialIndex + 1]?.id;

    const isPurchaseRequired =
      premium &&
      !courseEnrolled &&
      course_chapter?.some(
        ({ course_material }, index) =>
          index && course_material.some(({ id }) => id === nextMaterialId)
      );

    if (isPurchaseRequired) {
      openPurchaseCourseModal();
      return;
    }

    const courseMaterialStatus = currentMaterial?.course_material_status?.[0];

    const materialCanBeCompleted =
      courseMaterialStatus && !courseMaterialStatus.completed;

    if (materialCanBeCompleted)
      await toast.promise(
        updateMaterialStatusMutation
          .mutateAsync(courseMaterialStatus.id)
          .catch(() => null),
        {
          loading: 'Menandai materi sebagai selesai',
          success: 'Materi selesai dikerjakan',
          error: 'Gagal menandai materi sebagai selesai'
        }
      );

    if (!nextMaterialId) return;

    router.push(`/courses/${courseId}/${nextMaterialId}`, { scroll: false });
  };

  const selectedVideo = currentMaterial?.video ?? intro_video;

  return (
    <main className='text-black'>
      <PurchaseCourseModal
        open={purchaseCourseModalOpen}
        course={course}
        closeModal={closePurchaseCourseModal}
      />
      <EnrollCourseModal
        open={enrollCourseModalOpen}
        course={course}
        closeModal={closeEnrollCourseModal}
      />
      <OnboardingModal
        open={onboardingModalOpen}
        course={course}
        closeModal={closeOnboardingModal}
      />
      <section className='relative bg-primary-blue-50'>
        <div className='layout grid gap-4 py-4'>
          <BackButton href='/courses' label='Kelas Lainnya' />
          <div className='flex items-center gap-8'>
            <div className='grid w-full shrink-0 gap-2 lg:max-w-xl'>
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
            <ImagePreview
              wrapperClassName='w-full hidden lg:grid'
              className='h-52 w-full object-cover'
              src={image ?? courseCategoryImage}
              alt={name}
              width={320}
              height={208}
            />
          </div>
        </div>
      </section>
      <section className='layout relative grid w-full gap-x-8 gap-y-6 py-8 lg:grid-cols-[576px,1fr]'>
        <section className='order-1 lg:max-w-xl'>
          <VideoPlayer
            src={selectedVideo}
            courseId={courseId}
            updateMaterialStatusMutation={updateMaterialStatusMutation}
            onNextMaterial={handleNextMaterial}
          />
        </section>
        <section className='order-2 grid gap-4 lg:absolute lg:left-4 lg:top-[448px] lg:max-w-lg lg:pb-8'>
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
        <section className='order-1'>
          <CourseStudyCard
            course={course}
            courseEnrolled={courseEnrolled}
            selectedMaterialId={materialId}
            openPurchaseCourseModal={openPurchaseCourseModal}
          />
        </section>
      </section>
    </main>
  );
}

function getCourseMaterialById(
  course: Course | undefined,
  materialId: string | undefined
): CourseMaterial | null {
  if (!course || !materialId) return null;

  let selectedMaterial: CourseMaterial | null = null;

  for (const { course_material } of course.course_chapter!) {
    const material = course_material.find(({ id }) => id === materialId);
    const materialVideoExists = material?.video;

    if (materialVideoExists) {
      selectedMaterial = material;
      break;
    }
  }

  return selectedMaterial;
}
