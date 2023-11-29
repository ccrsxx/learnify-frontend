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
        'rounded-xl bg-white px-2 py-3 font-medium transition-colors',
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
