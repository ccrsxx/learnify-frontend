import { clsx } from 'clsx';
import { Button } from '../ui/button';

export type CourseTagProps = {
  index: number;
  label: string;
  selected: boolean;
  disabled: boolean;
  onClick: () => void;
};

export function CourseTag({
  index,
  label,
  disabled,
  selected,
  onClick
}: CourseTagProps): JSX.Element {
  return (
    <Button
      className={clsx(
        `clickable min-w-fit rounded-medium bg-white px-4 py-3 font-medium
         transition hover:brightness-95`,
        index === 1 ? 'col-span-6' : 'col-span-3',
        selected && '!bg-primary-blue-500 text-white'
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </Button>
  );
}
