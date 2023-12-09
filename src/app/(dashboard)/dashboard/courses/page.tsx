'use client';

import { createColumnHelper } from '@tanstack/react-table';
import { MdAdd } from 'react-icons/md';
import { generateRandomCourse } from '@/lib/random';
import { formatCurrency } from '@/lib/format';
import { Button } from '@/components/ui/button';
import { Table } from '@/components/dashboard/table';
import { RowAction } from '@/components/dashboard/row-action';
import type { ColumnDef } from '@tanstack/react-table';
import type { Course } from '@/lib/types/schema';

export default function DashboardCourses(): JSX.Element {
  return (
    <section>
      <Table rows={courses} columns={columns}>
        <Button className='clickable flex min-w-fit items-center gap-1 bg-primary-blue-500 px-4 py-2'>
          <MdAdd className='text-lg' />
          Tambah Kelas
        </Button>
      </Table>
    </section>
  );
}

const { accessor } = createColumnHelper<Course>();

const columns: ColumnDef<Course>[] = [
  accessor('code', {
    header: 'ID'
  }),
  accessor('course_category.name', {
    header: 'Kategori'
  }),
  accessor('name', {
    header: 'Kelas'
  }),
  accessor('premium', {
    header: 'Tipe',
    cell: ({ getValue }) => (getValue() ? 'PREMIUM' : 'GRATIS')
  }),
  accessor('difficulty', {
    header: 'Level',
    meta: { className: 'first-letter:uppercase lowercase' }
  }),
  accessor('price', {
    header: 'Harga',
    cell: ({ getValue }) => formatCurrency(getValue())
  }),
  {
    id: 'action',
    header: 'Aksi',
    enableSorting: false,
    meta: { className: 'p-0' },
    cell: () => <RowAction />
  }
];

const courses: Course[] = Array.from({ length: 12 }, generateRandomCourse);
