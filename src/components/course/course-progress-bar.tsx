import { MdCheckCircle } from 'react-icons/md';
import type { Course } from '@/lib/types/schema';

type CourseProgressBarProps = Required<
  Pick<Course, 'total_materials' | 'total_completed_materials'>
>;

export function CourseProgressBar({
  total_materials,
  total_completed_materials
}: CourseProgressBarProps): JSX.Element {
  const percentage = Math.round(
    (total_completed_materials / total_materials) * 100
  );

  return (
    <div className='flex items-center gap-1'>
      <MdCheckCircle className='text-xl text-primary-alert-success' />
      <div className='relative w-48 rounded-medium bg-gray-200'>
        <p className='relative z-10 px-2 py-0.5 text-xs text-white'>
          {percentage}% complete
        </p>
        <div
          style={{ width: `${percentage}%` }}
          className='absolute left-0 top-0 z-0 h-full rounded-medium bg-primary-blue-500 transition-[width]'
        />
      </div>
    </div>
  );
}
