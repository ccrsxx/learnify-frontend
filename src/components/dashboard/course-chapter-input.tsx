import { useFieldArray } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { MdAdd, MdDelete } from 'react-icons/md';
import { Input } from '../ui/input';
import { Alert } from '../ui/alert';
import { Button } from '../ui/button';
import { CourseMaterialInput } from './course-material-input';
import { variant } from './array-input';
import type { UseFormReturn } from 'react-hook-form';
import type { CourseSchema } from '@/app/(dashboard)/dashboard/courses/schema';

type CourseChapterInputProps = {
  form: UseFormReturn<CourseSchema>;
  loading: boolean;
};

export function CourseChapterInput({
  form,
  loading
}: CourseChapterInputProps): JSX.Element {
  const {
    control,
    formState: { errors },
    register
  } = form;

  const { fields, append, remove } = useFieldArray<CourseSchema>({
    name: 'course_chapter',
    control: control
  });

  const chapterErrorMessage =
    fields.length === 1 && form.formState.errors.course_chapter?.root?.message;

  return (
    <ul className='grid gap-4'>
      <AnimatePresence mode='popLayout'>
        {fields.map((item, index) => {
          const chapterNameId = `course_chapter.${index}.name` as const;
          const chapterDurationId = `course_chapter.${index}.duration` as const;

          return (
            <motion.li
              className='grid gap-4 rounded-medium border p-4'
              layout='position'
              {...variant}
              key={item.id}
            >
              <Input
                id={chapterNameId}
                type='text'
                label='Nama Chapter'
                error={errors.course_chapter?.[index]?.name}
                disabled={loading}
                register={register(chapterNameId)}
                placeholder='Masukkan nama chapter'
              />
              <Input
                id={chapterDurationId}
                type='number'
                label='Durasi Chapter'
                error={errors.course_chapter?.[index]?.duration}
                disabled={loading}
                register={register(chapterDurationId, { valueAsNumber: true })}
                placeholder='Masukkan durasi chapter'
              />
              <div className='ml-auto flex gap-2 text-white'>
                {fields.length > 1 && (
                  <Button
                    className='smooth-tab flex items-center gap-2 rounded-medium bg-primary-alert-error 
                               px-4 py-2 transition hover:brightness-90'
                    disabled={loading}
                    onClick={() => remove(index)}
                  >
                    <MdDelete className='text-xl' />
                    Hapus Chapter
                  </Button>
                )}
                {fields.length !== 5 && index === fields.length - 1 && (
                  <Button
                    type='button'
                    className='smooth-tab flex items-center gap-2 rounded-medium bg-primary-blue-300 
                               px-4 py-2 transition hover:brightness-90'
                    disabled={loading}
                    onClick={() =>
                      append({
                        name: '',
                        // @ts-expect-error: currently the type for appending nested array from rhf
                        // is not yet supported, so we need to ignore this error for now, until it's supported
                        course_material: [{ name: '', video: '' }]
                      })
                    }
                  >
                    <MdAdd className='text-xl' />
                    Tambah Chapter
                  </Button>
                )}
              </div>
              <CourseMaterialInput
                form={form}
                loading={loading}
                chapterIndex={index}
              />
              {chapterErrorMessage && (
                <Alert variant='error' message={chapterErrorMessage} />
              )}
            </motion.li>
          );
        })}
      </AnimatePresence>
    </ul>
  );
}
