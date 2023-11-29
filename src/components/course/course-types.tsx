import { CourseTag } from './course-tag';
import type { CourseType } from '@/lib/types/enum';

type CourseTypeProps = {
  disabled: boolean;
  selectedCourseType: CourseType;
  handleCourseTypeClick: (type: CourseType) => () => void;
};

export function CourseTypes({
  disabled,
  selectedCourseType,
  handleCourseTypeClick
}: CourseTypeProps): JSX.Element {
  return (
    <section className='grid grid-cols-12 gap-4 text-black'>
      {courseTypes.map(({ id, label }, i) => (
        <CourseTag
          index={i}
          label={label}
          selected={selectedCourseType === id}
          disabled={disabled}
          onClick={handleCourseTypeClick(id)}
          key={id}
        />
      ))}
    </section>
  );
}

export type CourseTypeWithLabel = {
  id: CourseType;
  label: string;
};

const courseTypes: CourseTypeWithLabel[] = [
  { id: 'all', label: 'All' },
  { id: 'premium', label: 'Kelas Premium' },
  { id: 'free', label: 'Kelas Gratis' }
];
