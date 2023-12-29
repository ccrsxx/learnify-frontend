import { CourseTag } from './course-tag';
import type { CourseType, MyCourseType } from '@/lib/types/enum';
import type { GenericCourseType } from '@/app/(public)/courses/courses';

type CourseTypeProps<T extends boolean> = {
  disabled: boolean;
  userCourses?: T;
  selectedCourseType: GenericCourseType<T>;
  handleCourseTypeClick: (type: GenericCourseType<T>) => () => void;
};

export function CourseTypes<T extends boolean>({
  disabled,
  userCourses,
  selectedCourseType,
  handleCourseTypeClick
}: CourseTypeProps<T>): JSX.Element {
  const targetCourseTypes = userCourses ? myCourseTypes : courseTypes;

  return (
    <section className='flex grid-cols-12 gap-4 overflow-x-auto text-black md:grid lg:overflow-x-visible'>
      {targetCourseTypes.map(({ id, label }, i) => (
        <CourseTag
          index={i}
          label={label}
          selected={selectedCourseType === id}
          disabled={disabled}
          onClick={handleCourseTypeClick(id as GenericCourseType<T>)}
          key={id}
        />
      ))}
    </section>
  );
}

type CourseTypeWithLabel = {
  id: CourseType;
  label: string;
};

const courseTypes: CourseTypeWithLabel[] = [
  { id: 'all', label: 'All' },
  { id: 'premium', label: 'Kelas Premium' },
  { id: 'free', label: 'Kelas Gratis' }
];

type MyCourseTypeWithLabel = {
  id: MyCourseType;
  label: string;
};

const myCourseTypes: MyCourseTypeWithLabel[] = [
  { id: 'all', label: 'All' },
  { id: 'ongoing', label: 'In Progress' },
  { id: 'completed', label: 'Selesai' }
];
