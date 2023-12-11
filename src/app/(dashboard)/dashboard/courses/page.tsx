'use client';

import { createColumnHelper } from '@tanstack/react-table';
import { MdAdd } from 'react-icons/md';
import { generateRandomCourse } from '@/lib/random';
import { formatCurrency } from '@/lib/format';
import { useModal } from '@/lib/hooks/use-modal';
import { useCategories } from '@/lib/hooks/use-categories';
import { Button } from '@/components/ui/button';
import { Table } from '@/components/table/table';
import { RowAction } from '@/components/table/row-action';
import { NewCourseModal } from '@/components/modal/new-course-modal';
import { NewCourseForm } from '@/components/modal/new-course-form';
import type { ColumnDef } from '@tanstack/react-table';
import type { Course } from '@/lib/types/schema';

export default function DashboardCourses(): JSX.Element {
  const { open, openModal, closeModal } = useModal();

  const { data: categoriesData } = useCategories();

  const categories = categoriesData?.data;

  return (
    <section>
      <NewCourseModal open={open} closeModal={closeModal}>
        <NewCourseForm categories={categories}>
          <div className='mt-2 grid grid-cols-2 gap-4 text-white'>
            <Button
              className='bg-primary-alert-error px-4 py-3 transition hover:brightness-90'
              onClick={closeModal}
            >
              Kembali
            </Button>
            <Button className='bg-primary-blue-500 px-4 py-3 transition hover:brightness-90'>
              Simpan
            </Button>
          </div>
        </NewCourseForm>
      </NewCourseModal>
      <Table rows={courses} columns={columns}>
        <Button
          className='clickable flex min-w-fit items-center gap-1 bg-primary-blue-500 px-4 py-2'
          onClick={openModal}
        >
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
