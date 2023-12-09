import { useState } from 'react';
import { clsx } from 'clsx';
import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel
} from '@tanstack/react-table';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { rankItem } from '@tanstack/match-sorter-utils';
import { SortIcon } from './sort-icon';
import type { PropsWithChildren } from 'react';
import type {
  Row,
  ColumnDef,
  FilterMeta,
  SortingState,
  SortDirection,
  ColumnFiltersState
} from '@tanstack/react-table';
import type { IconType } from 'react-icons';

type TableProps<T> = PropsWithChildren<{
  rows: T[];
  columns: ColumnDef<T>[];
}>;

export function Table<T>({
  rows,
  columns,
  children
}: TableProps<T>): JSX.Element {
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const { getHeaderGroups, getRowModel } = useReactTable<T>({
    data: rows,
    state: { globalFilter, columnFilters, sorting },
    columns: columns,
    sortDescFirst: false,
    globalFilterFn: fuzzyFilter,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters
  });

  return (
    <div className='grid gap-4'>
      <div className='flex gap-2'>
        <input
          className={clsx(
            'custom-input justify-self-start py-2 text-black',
            children && 'w-full'
          )}
          type='text'
          placeholder='Search...'
          value={globalFilter}
          onChange={({ target: { value } }) => setGlobalFilter(value)}
        />
        {children}
      </div>
      <div className='relative max-w-full overflow-x-auto rounded-medium shadow-low'>
        <table>
          <thead>
            {getHeaderGroups().map(({ id, headers }) => (
              <tr key={id}>
                {headers.map(
                  ({
                    id,
                    column: {
                      columnDef,
                      getCanSort,
                      getIsSorted,
                      getToggleSortingHandler
                    },
                    getContext
                  }) => (
                    <th
                      className={clsx(
                        'group',
                        getCanSort() && 'cursor-pointer select-none'
                      )}
                      onClick={getToggleSortingHandler()}
                      key={id}
                    >
                      <div className='flex items-center gap-2'>
                        <p className='whitespace-nowrap'>
                          {flexRender(columnDef.header, getContext())}
                        </p>
                        {getCanSort() && (
                          <div className='-space-y-1 text-xs'>
                            {sortItems.map((sortItem) => (
                              <SortIcon
                                {...sortItem}
                                isSorted={getIsSorted()}
                                key={sortItem.sortDirection}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </th>
                  )
                )}
              </tr>
            ))}
          </thead>
          <tbody>
            {getRowModel().rows.map(({ id, getVisibleCells }) => (
              <tr key={id}>
                {getVisibleCells().map(
                  ({
                    id,
                    column: {
                      columnDef: { cell, meta }
                    },
                    getContext
                  }) => (
                    <td
                      className={clsx(
                        'whitespace-nowrap',
                        (meta as { className?: string } | undefined)?.className
                      )}
                      key={id}
                    >
                      {flexRender(cell, getContext())}
                    </td>
                  )
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function fuzzyFilter<T>(
  { getValue }: Row<T>,
  columnId: string,
  value: string,
  addMeta: (meta: FilterMeta) => void
): boolean {
  const itemRank = rankItem(getValue(columnId), value);

  addMeta({ itemRank });

  return itemRank.passed;
}

export type SortItem = {
  sortDirection: SortDirection;
  Icon: IconType;
};

const sortItems: SortItem[] = [
  {
    sortDirection: 'asc',
    Icon: MdKeyboardArrowUp as IconType
  },
  {
    sortDirection: 'desc',
    Icon: MdKeyboardArrowDown as IconType
  }
];
