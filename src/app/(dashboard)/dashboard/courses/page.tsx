'use client';

import { createColumnHelper } from '@tanstack/react-table';
import { MdAdd } from 'react-icons/md';
import { Toaster } from 'react-hot-toast';
import { useModal } from '@/lib/hooks/use-modal';
import { formatCurrency } from '@/lib/format';
import { useAdminCourses } from '@/lib/hooks/query/use-admin-courses';
import { Button } from '@/components/ui/button';
import { Table } from '@/components/table/table';
import { RowAction } from '@/components/table/row-action';
import { NewCourseModal } from '@/components/modal/new-course-modal';
import type { ColumnDef } from '@tanstack/react-table';
import type { Course } from '@/lib/types/schema';

export default function DashboardCourses(): JSX.Element {
  const {
    open: newCourseModalOpen,
    openModal: openNewCourseModal,
    closeModal: closeNewCourseModal
  } = useModal();

  const { data, isLoading } = useAdminCourses();

  const courses = data?.data ?? [];

  const columnsWithAction: ColumnDef<Course>[] = [
    ...columns,
    {
      id: 'action',
      size: 98,
      header: 'Aksi',
      enableSorting: false,
      meta: { className: 'p-0 text-clip overflow-visible' },
      cell: (cell) => <RowAction course={cell.row.original} />
    }
  ];

  return (
    <>
      <NewCourseModal
        open={newCourseModalOpen}
        closeModal={closeNewCourseModal}
      />
      <Table rows={courses} columns={columnsWithAction} loading={isLoading}>
        <Button
          className='clickable w overflow flex min-w-fit items-center gap-1 bg-primary-blue-500 px-4 py-2'
          onClick={openNewCourseModal}
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
    cell: ({ getValue }) => {
      const price = getValue() as number | null;
      return price ? formatCurrency(price) : 'GRATIS';
    }
  })
];
