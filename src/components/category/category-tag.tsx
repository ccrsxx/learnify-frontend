import { clsx } from 'clsx';
import { Button } from '../ui/button';
import type { Category } from '@/lib/types/schema';

type CategoryTagProps = {
  category?: Category;
  selected?: boolean;
  onClick?: () => void;
};

export function CategoryTag({
  category,
  selected,
  onClick
}: CategoryTagProps): JSX.Element {
  if (!category)
    return <div className='h-8 w-24 animate-pulse rounded-xl bg-gray-200' />;

  const { name } = category;

  return (
    <Button
      className={clsx(
        `clickable rounded-xl bg-primary-blue-50 !py-1 px-3 font-medium 
         text-black shadow-low transition hover:brightness-95`,
        selected && 'bg-primary-blue-500 text-white'
      )}
      onClick={onClick}
    >
      {name}
    </Button>
  );
}
