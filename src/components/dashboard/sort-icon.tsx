import { clsx } from 'clsx';
import type { SortDirection } from '@tanstack/react-table';
import type { SortItem } from './table';

type SortIconProps = SortItem & {
  isSorted: false | SortDirection;
};

export function SortIcon({
  isSorted,
  sortDirection,
  Icon
}: SortIconProps): JSX.Element {
  return (
    <div
      className={clsx(
        'transition-opacity group-hover:opacity-100',
        isSorted ? 'opacity-100' : 'opacity-0'
      )}
    >
      <Icon
        className={clsx(
          'transition-colors',
          isSorted === sortDirection ? 'text-gray-700' : 'text-gray-400'
        )}
      />
    </div>
  );
}
