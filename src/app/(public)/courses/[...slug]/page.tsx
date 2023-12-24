'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast, Toaster } from 'react-hot-toast';
import { SiTelegram } from 'react-icons/si';
import { MdWarning } from 'react-icons/md';
import { useModal } from '@/lib/hooks/use-modal';
import { useCourse } from '@/lib/hooks/query/use-course';
import { useMaterialStatus } from '@/lib/hooks/query/use-material-status';
import { useAuth } from '@/lib/context/auth-context';
import { CourseStats } from '@/components/course/course-stats';
import { VideoPlayer } from '@/components/ui/video-player';
import { CourseStudyCard } from '@/components/course/course-study-card';
import { CourseDetailsSkeleton } from '@/components/common/skeleton';
import { BackButton } from '@/components/ui/back-arrow';
import { PurchaseCourseModal } from '@/components/modal/purchase-course-modal';
import { EnrollCourseModal } from '@/components/modal/enroll-course-modal';
import { Button } from '@/components/ui/button';
import { OnboardingModal } from '@/components/modal/onboarding-modal';
import type { Course, CourseMaterial } from '@/lib/types/schema';

export default function Course({
  params: { slug }
}: {
  params: { slug: string[] };
}): JSX.Element {
  const router = useRouter();

  const { user } = useAuth();

  const [courseId, materialId] = slug;

  const { updateMaterialStatusMutation } = useMaterialStatus();

  const { data: courseData, isLoading: courseLoading } = useCourse(courseId);

  const [currentMaterial, setCurrentMaterial] = useState<CourseMaterial | null>(
    () => getCourseMaterialById(courseData?.data, materialId)
  );

  const [statusMaterialLoading, setStatusMaterialLoading] = useState(false);

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

    setCurrentMaterial(newCurrentMaterialId);
  }, [course, materialId]);

  useEffect(() => {
    if (!course || !courseEnrolled) return;

    const isOnboardingRequired = course.user_course?.[0]?.onboarded === false;

    if (!isOnboardingRequired) return;

    openOnboardingModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [course, courseEnrolled]);

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
    premium,
    telegram,
    intro_video,
    description,
    course_chapter,
    target_audience
  } = course;

  const handleNextMaterial = async (): Promise<void> => {
    const isNotEnrolledOnFreeCourse = !courseEnrolled && !premium;

    if (isNotEnrolledOnFreeCourse) {
      openEnrollCourseModal();
      return;
    }

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

    if (materialCanBeCompleted) {
      setStatusMaterialLoading(true);

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

      setStatusMaterialLoading(false);
    }

    if (!nextMaterialId) return;

    router.push(`/courses/${courseId}/${nextMaterialId}`);
  };

  const selectedVideo = currentMaterial?.video ?? intro_video;

  return (
    <main className='grid gap-8 text-black'>
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
      <Toaster position='bottom-center' />
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
          {user ? (
            <VideoPlayer src={selectedVideo}>
              <div
                className='absolute bottom-0 right-0 flex gap-3 p-4 
                   opacity-0 transition-opacity group-hover:opacity-100'
              >
                <Link
                  href='/courses'
                  className='clickable bg-primary-blue-50 px-4 py-2 text-primary-blue-300'
                >
                  Kelas lainnya
                </Link>
                <Button
                  className='clickable bg-primary-blue-500 px-4 py-2 text-white'
                  loading={statusMaterialLoading}
                  onClick={handleNextMaterial}
                >
                  Next
                </Button>
              </div>
            </VideoPlayer>
          ) : (
            <div
              className='grid h-80 w-full content-center justify-items-center 
                         gap-4 rounded-medium bg-gray-200'
            >
              <MdWarning className='text-5xl text-primary-alert-warning' />
              <Link
                className='clickable bg-primary-blue-500 px-4 py-2 text-white'
                href={`/login?redirect=/courses/${courseId}`}
              >
                Login untuk melihat video
              </Link>
            </div>
          )}
          <div className='grid gap-2' onClick={openOnboardingModal}>
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

  for (const { course_material } of course.course_chapter) {
    const material = course_material.find(({ id }) => id === materialId);

    if (material) {
      selectedMaterial = material;
      break;
    }
  }

  return selectedMaterial;
}
