'use client';

import { createColumnHelper } from '@tanstack/react-table';
import { MdAdd } from 'react-icons/md';
import { Toaster } from 'react-hot-toast';
import { formatCurrency } from '@/lib/format';
import { useModal } from '@/lib/hooks/use-modal';
import { useCategories } from '@/lib/hooks/use-categories';
import { useCourses } from '@/lib/hooks/use-courses';
import { Button } from '@/components/ui/button';
import { Table } from '@/components/table/table';
import { RowAction } from '@/components/table/row-action';
import { NewCourseModal } from '@/components/modal/new-course-modal';
import type { ColumnDef } from '@tanstack/react-table';
import type { Course } from '@/lib/types/schema';

export default function DashboardCourses(): JSX.Element {
  const { open, openModal, closeModal } = useModal();

  const { data, isLoading } = useCourses();

  const courses = data?.data ?? [];

  const { data: categoriesData } = useCategories();

  const columnsWithAction: ColumnDef<Course>[] = [
    ...columns,
    {
      id: 'action',
      size: 98,
      header: 'Aksi',
      enableSorting: false,
      meta: { className: 'p-0 text-clip overflow-visible' },
      cell: () => <RowAction />
    }
  ];

  const categories = categoriesData?.data;

  return (
    <>
      <NewCourseModal
        open={open}
        categories={categories}
        closeModal={closeModal}
      />
      <Table rows={courses} columns={columnsWithAction} loading={isLoading}>
        <Button
          className='clickable w overflow flex min-w-fit items-center gap-1 bg-primary-blue-500 px-4 py-2'
          onClick={openModal}
        >
          <MdAdd className='text-lg' />
          Tambah Kelas
        </Button>
      </Table>
      <Toaster position='bottom-center' />
    </>
  );
}

const { accessor } = createColumnHelper<Course>();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const columns: ColumnDef<Course, any>[] = [
  accessor('code', {
    header: 'ID',
    size: 112
  }),
  accessor('course_category.name', {
    header: 'Kategori',
    size: 192
  }),
  accessor('name', {
    header: 'Kelas',
    size: 320
  }),
  accessor('premium', {
    header: 'Tipe',
    size: 128,
    cell: ({ getValue }) => (getValue() ? 'PREMIUM' : 'GRATIS')
  }),
  accessor('difficulty', {
    header: 'Level',
    size: 128,
    meta: { className: 'first-letter:uppercase lowercase' }
  }),
  accessor('price', {
    header: 'Harga',
    size: 128,
    cell: ({ getValue }) => formatCurrency(getValue() as number)
  })
];
