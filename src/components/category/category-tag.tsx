import { clsx } from 'clsx';
import { Button } from '../ui/button';
import type { CourseCategory } from '@/lib/types/schema';

type CategoryTagProps = {
  category: CourseCategory;
  selected: boolean;
  onClick: () => void;
};

export function CategoryTag({
  category,
  selected,
  onClick
}: CategoryTagProps): JSX.Element {
  const { name } = category;

  return (
    <Button
      className={clsx(
        `clickable min-w-fit rounded-medium bg-primary-blue-50 !py-1 px-3 
         font-medium text-black shadow-low transition hover:brightness-95`,
        selected && 'bg-primary-blue-500 text-white'
      )}
      onClick={onClick}
    >
      {name}
    </Button>
  );
}
