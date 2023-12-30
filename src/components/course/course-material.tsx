import Link from 'next/link';
import { MdLock, MdPlayCircle } from 'react-icons/md';
import { clsx } from 'clsx';
import type { MouseEvent } from 'react';
import type { Course, CourseMaterial } from '@/lib/types/schema';

type CourseMaterialProps = {
  course: Course;
  chapter_index: number;
  courseEnrolled: boolean;
  course_material: CourseMaterial;
  selectedMaterialId?: string;
  openPurchaseCourseModal: () => void;
};

export function CourseMaterial({
  course,
  chapter_index,
  courseEnrolled,
  course_material,
  selectedMaterialId,
  openPurchaseCourseModal
}: CourseMaterialProps): JSX.Element {
  const { id: courseId, premium } = course;
  const {
    id: materialId,
    name,
    order_index: material_index,
    course_material_status: [{ completed }] = [{}]
  } = course_material;

  const needsToPurchase = !courseEnrolled && premium && chapter_index > 1;

  const handleMaterialClick =
    (_materialId: string) => (e: MouseEvent<HTMLAnchorElement>) => {
      if (needsToPurchase) {
        e.preventDefault();
        openPurchaseCourseModal();
      }
    };

  const isMaterialSelected = materialId === selectedMaterialId;

  const targetLink = `/courses/${courseId}/${materialId}`;

  const parsedLink = isMaterialSelected
    ? targetLink.split('/').slice(0, -1).join('/')
    : targetLink;

  return (
    <li>
      <Link
        className={clsx(
          `smooth-tab flex gap-2 rounded-medium bg-gray-100
           px-4 py-2 transition hover:brightness-90 md:justify-between`,
          isMaterialSelected && 'bg-primary-blue-50 text-primary-blue-500'
        )}
        href={parsedLink}
        scroll={false}
        onClick={handleMaterialClick(materialId)}
      >
        <div className='flex w-full items-center justify-center gap-2'>
          <p
            className='grid h-8 w-8 shrink-0 place-items-center rounded-full
                       bg-gray-200 p-1 text-center text-sm font-medium'
          >
            {material_index}
          </p>
          <h4 className='w-full text-center text-sm font-medium md:text-start md:text-base'>
            {name}
          </h4>
        </div>
        <div className='ml-auto flex items-center text-3xl'>
          {needsToPurchase ? (
            <MdLock className='text-gray-400' />
          ) : (
            <MdPlayCircle
              className={clsx(
                'transition-colors',
                completed
                  ? 'text-primary-alert-success'
                  : 'text-primary-blue-500'
              )}
            />
          )}
        </div>
      </Link>
    </li>
  );
}
