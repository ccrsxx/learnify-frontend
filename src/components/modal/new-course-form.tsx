import { TYPES } from '@/lib/types/enum';
import { Input } from '../ui/input';
import { Select } from '../ui/select';
import type { PropsWithChildren } from 'react';
import type { CourseCategory } from '@/lib/types/schema';

type NewCourseFormProps = PropsWithChildren<{
  categories: CourseCategory[] | undefined;
}>;

export function NewCourseForm({
  categories,
  children
}: NewCourseFormProps): JSX.Element {
  return (
    <form className='grid gap-4 text-black'>
      <Input
        id='name'
        type='text'
        label='Nama kelas'
        placeholder='Masukkan nama kelas'
      />
      <Input
        id='code'
        type='text'
        label='Kode Kelas'
        placeholder='Masukkan nama kode kelas'
      />
      <Select value={undefined} label='Kategori' options={categories} />
      <Select value={undefined} label='Tipe kelas' options={courseTypes} />
      <Input
        id='price'
        type='number'
        label='Harga'
        placeholder='Masukkan harga kelas'
      />
      <Input
        id='description'
        type='textarea'
        label='Deskripsi'
        placeholder='Masukkan deskripsi kelas'
      />
      {children}
    </form>
  );
}

const courseTypes = TYPES.map((type) => ({
  id: type,
  name: type.toLowerCase()
}));
