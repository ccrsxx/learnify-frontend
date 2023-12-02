import { Checkbox } from '../ui/checkbox';
import type { Category } from '@/lib/types/schema';
import type { CourseFilter, CourseDifficulty } from '@/lib/types/enum';
import type { CourseFilters } from '@/app/(public)/courses/page';

export type CourseFiltersKey = 'filter' | 'category' | 'difficulty';

type CourseFiltersProps = {
  categories: Category[];
  courseFilters: CourseFilters;
  handleCourseFiltersChange: <T extends CourseFiltersKey>(
    filter: T,
    id: keyof CourseFilters[T]
  ) => () => void;
};

export function CourseFilters({
  categories,
  courseFilters,
  handleCourseFiltersChange
}: CourseFiltersProps): JSX.Element {
  type FilterSection = {
    id: CourseFiltersKey;
    label: string;
    checkboxes: CheckboxProps[];
  };

  const filterSections: FilterSection[] = [
    {
      id: 'filter',
      label: 'Filter',
      checkboxes: courseFilterCheckboxes
    },
    {
      id: 'category',
      label: 'Kategori',
      checkboxes: categories.map(({ name }) => ({ id: name, label: name }))
    },
    {
      id: 'difficulty',
      label: 'Level',
      checkboxes: difficultyCheckboxes
    }
  ];

  return (
    <>
      {filterSections.map(({ id, label, checkboxes }) => (
        <section className='grid gap-4' key={id}>
          <h2 className='text-xl font-bold'>{label}</h2>
          <div className='grid gap-4'>
            {checkboxes.map(({ id: rawId, label }) => {
              const checkboxId = rawId as keyof CourseFilters[typeof id];

              return (
                <Checkbox
                  label={label}
                  checked={courseFilters[id][checkboxId]}
                  onClick={handleCourseFiltersChange(id, checkboxId)}
                  key={checkboxId}
                />
              );
            })}
          </div>
        </section>
      ))}
    </>
  );
}

type CheckboxProps<T extends string = string> = {
  id: T;
  label: string;
};

const courseFilterCheckboxes: CheckboxProps<CourseFilter>[] = [
  { id: 'new', label: 'Paling Baru' },
  { id: 'popular', label: 'Paling popular' },
  { id: 'promo', label: 'Promo' }
];

const difficultyCheckboxes: CheckboxProps<CourseDifficulty>[] = [
  { id: 'beginner', label: 'Beginner Level' },
  { id: 'intermediate', label: 'Intermediate Level' },
  { id: 'advanced', label: 'Advanced Level' }
];
