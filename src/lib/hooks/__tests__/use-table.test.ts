import { renderHook } from '@testing-library/react';
import { useTable } from '../use-table';
import type { ColumnDef } from '@tanstack/react-table';

describe('useTable', () => {
  it('should return loading state correctly', () => {
    const columns = [{ header: 'Test' }] as ColumnDef<{ test: string }>[];
    const rows = [{ test: 'data' }];

    const { result } = renderHook(() =>
      useTable({ rows, columns, loading: true })
    );

    expect(result.current.tableColumns[0].cell).toBeDefined();
    expect(result.current.tableRows.length).toBe(12);
  });

  it('should return data state correctly', () => {
    const columns = [{ header: 'Test' }] as ColumnDef<{ test: string }>[];
    const rows = [{ test: 'data' }];

    const { result } = renderHook(() =>
      useTable({ rows, columns, loading: false })
    );

    expect(result.current.tableColumns[0].cell).toBeUndefined();
    expect(result.current.tableRows.length).toBe(1);
    expect(result.current.tableRows[0].test).toBe('data');
  });
});
