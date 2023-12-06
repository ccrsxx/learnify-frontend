import Link from 'next/link';
import { clsx } from 'clsx';
import { MdCheckCircle, MdLock, MdPlayCircle } from 'react-icons/md';
import type { MouseEvent } from 'react';
import type { Course } from '@/lib/types/schema';

type CourseStudyCardProps = {
  course: Course;
  selectedMaterialId?: string;
  openModal: () => void;
};

export function CourseStudyCard({
  course: { id: courseId, premium, course_chapter },
  selectedMaterialId,
  openModal
}: CourseStudyCardProps): JSX.Element {
  const handleMaterialClick =
    (_materialId: string, chapter_index: number) =>
    (e: MouseEvent<HTMLAnchorElement>) => {
      const neededPremium = premium && chapter_index > 1;

      if (neededPremium) {
        e.preventDefault();
        openModal();
      }
    };

  return (
    <div className='grid w-full content-start gap-4 rounded-2xl bg-white p-6 shadow-high'>
      <div className='flex justify-between'>
        <h2 className='text-xl font-bold text-black'>Materi Belajar</h2>
        <div className='flex items-center gap-1'>
          <MdCheckCircle className='text-xl text-primary-alert-success' />
          <div className='relative w-48 rounded-xl bg-gray-200'>
            <p className='relative z-10 px-2 py-0.5 text-xs text-white'>
              24% complete
            </p>
            <div className='absolute left-0 top-0 z-0 h-full w-[24%] rounded-xl bg-primary-blue-500' />
          </div>
        </div>
      </div>
      <ol className='grid gap-6'>
        {course_chapter?.map(
          ({
            id,
            name,
            duration,
            course_material,
            order_index: chapter_index
          }) => (
            <li className='grid gap-3' key={id}>
              <div className='flex justify-between gap-2'>
                <h3 className='font-bold text-primary-blue-500'>
                  Chapter {chapter_index} - {name}
                </h3>
                <p className='min-w-fit font-bold text-primary-blue-300'>
                  {duration} Menit
                </p>
              </div>
              <ol className='grid gap-3'>
                {course_material?.map(
                  ({ id: materialId, name, order_index: material_index }) => {
                    const isMaterialSelected =
                      materialId === selectedMaterialId;

                    const targetLink = `/courses/${courseId}/${materialId}`;

                    const parsedLink = isMaterialSelected
                      ? targetLink.split('/').slice(0, -1).join('/')
                      : targetLink;

                    return (
                      <li key={materialId}>
                        <Link
                          className={clsx(
                            `clickable flex justify-between gap-2 rounded-xl 
                             bg-gray-100 px-4 py-2`,
                            isMaterialSelected &&
                              'bg-primary-blue-50 text-primary-blue-500'
                          )}
                          href={parsedLink}
                          scroll={false}
                          onClick={handleMaterialClick(
                            materialId,
                            chapter_index
                          )}
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
                            {premium && chapter_index > 1 ? (
                              <MdLock className='text-2xl text-gray-400' />
                            ) : (
                              <MdPlayCircle className='text-2xl text-primary-blue-500' />
                            )}
                          </div>
                        </Link>
                      </li>
                    );
                  }
                )}
              </ol>
            </li>
          )
        )}
      </ol>
    </div>
  );
}
