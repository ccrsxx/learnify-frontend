import Link from 'next/link';
import { MdLock, MdPlayCircle } from 'react-icons/md';
import { clsx } from 'clsx';
import type { MouseEvent } from 'react';
import type { Course, CourseMaterial } from '@/lib/types/schema';

type CourseMaterialProps = {
  course: Course;
  chapter_index: number;
  course_material: CourseMaterial;
  courseEnrolled: boolean;
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
          `smooth-tab flex justify-between gap-2 rounded-medium
           bg-gray-100 px-4 py-2 transition hover:brightness-90`,
          isMaterialSelected && 'bg-primary-blue-50 text-primary-blue-500'
        )}
        href={parsedLink}
        scroll={false}
        onClick={handleMaterialClick(materialId)}
      >
        <div className='flex items-center gap-2'>
          <p
            className='grid h-8 w-8 place-items-center rounded-full bg-gray-200
                       p-1 text-center text-sm font-medium'
          >
            {material_index}
          </p>
          <h4 className='font-medium'>{name}</h4>
        </div>
        <div className='grid place-items-center'>
          {needsToPurchase ? (
            <MdLock className='text-2xl text-gray-400' />
          ) : (
            <MdPlayCircle
              className={clsx(
                'text-2xl transition-colors',
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
