import { useMemo } from 'react';
import type { ColumnDef } from '@tanstack/react-table';

type Table<T> = {
  tableColumns: ColumnDef<T>[];
  tableRows: T[];
};

type TableProps<T> = {
  rows: T[];
  columns: ColumnDef<T>[];
  loading: boolean;
};

export function useTable<T>({
  rows,
  columns,
  loading
}: TableProps<T>): Table<T> {
  const tableColumns = useMemo(
    () =>
      loading
        ? columns.map((column) => ({
            ...column,
            cell: () => (
              <div className='h-4 w-3/4 animate-pulse rounded-medium bg-gray-200' />
            )
          }))
        : columns,
    [loading, columns]
  );

  const tableRows = useMemo(
    () => (loading ? Array.from<T>({ length: 12 }).fill({} as T) : rows),
    [loading, rows]
  );

  return { tableColumns, tableRows };
}
