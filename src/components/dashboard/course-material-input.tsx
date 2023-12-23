import { useFieldArray } from 'react-hook-form';
import { MdAdd, MdDelete } from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { variant } from './array-input';
import type { UseFormReturn } from 'react-hook-form';
import type { CourseSchema } from '@/lib/form/schema';

type CourseMaterialInputProps = {
  form: UseFormReturn<CourseSchema>;
  chapterIndex: number;
};

export function CourseMaterialInput({
  form: {
    control,
    formState: { errors },
    register
  },
  chapterIndex
}: CourseMaterialInputProps): JSX.Element {
  const { fields, append, remove } = useFieldArray<CourseSchema>({
    name: `course_chapter.${chapterIndex}.course_material`,
    control: control
  });

  return (
    <ul className='grid gap-4'>
      <AnimatePresence mode='popLayout'>
        {fields.map((item, materialIndex) => {
          const materialNameId =
            `course_chapter.${chapterIndex}.course_material.${materialIndex}.name` as const;
          const materialVideoId =
            `course_chapter.${chapterIndex}.course_material.${materialIndex}.video` as const;

          return (
            <motion.li
              className='grid gap-4 rounded-medium border p-4'
              layout='position'
              {...variant}
              key={item.id}
            >
              <div className='grid gap-2'>
                <Input
                  id={materialNameId}
                  type='text'
                  label='Nama Materi'
                  error={
                    errors.course_chapter?.[chapterIndex]?.course_material?.[
                      materialIndex
                    ]?.name
                  }
                  placeholder='Masukkan nama materi'
                  register={register(materialNameId)}
                />
                <Input
                  id={materialVideoId}
                  type='text'
                  label='Link Video'
                  error={
                    errors.course_chapter?.[chapterIndex]?.course_material?.[
                      materialIndex
                    ]?.video
                  }
                  placeholder='Masukkan link video'
                  register={register(materialVideoId)}
                />
              </div>
              <div className='ml-auto flex gap-2 text-white'>
                {fields.length > 1 && (
                  <Button
                    className='smooth-tab flex items-center gap-2 rounded-medium 
                               bg-primary-alert-error  px-4  py-2 transition hover:brightness-90'
                    onClick={() => remove(materialIndex)}
                  >
                    <MdDelete className='text-xl' />
                    Hapus Materi
                  </Button>
                )}
                {fields.length !== 5 && materialIndex === fields.length - 1 && (
                  <Button
                    type='button'
                    className='smooth-tab flex items-center gap-2 rounded-medium 
                               bg-primary-blue-300  px-4  py-2 transition hover:brightness-90'
                    onClick={() => append({ name: '' })}
                  >
                    <MdAdd className='text-xl' />
                    Tambah materi
                  </Button>
                )}
              </div>
            </motion.li>
          );
        })}
      </AnimatePresence>
    </ul>
  );
}
