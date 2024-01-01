import { Controller, useFieldArray } from 'react-hook-form';
import { useState } from 'react';
import { useCategories } from '@/lib/hooks/query/use-categories';
import {
  courseTypes,
  difficultyTypes
} from '@/app/(dashboard)/dashboard/courses/schema';
import { Input } from '../ui/input';
import { Select } from '../ui/select';
import { Accordion } from '../ui/accordion';
import { ArrayInput } from '../dashboard/array-input';
import { CourseChapterInput } from './course-chapter-input';
import type { PropsWithChildren } from 'react';
import type { SubmitHandler, UseFormReturn } from 'react-hook-form';
import type { CourseSchema } from '@/app/(dashboard)/dashboard/courses/schema';

type CourseFormProps = PropsWithChildren<{
  form: UseFormReturn<CourseSchema>;
  loading: boolean;
  onSubmit: SubmitHandler<CourseSchema>;
}>;

export function CourseForm({
  form,
  loading,
  children,
  onSubmit
}: CourseFormProps): JSX.Element {
  const {
    control,
    formState: { errors },
    watch,
    register,
    handleSubmit
  } = form;

  const { fields, append, remove } = useFieldArray<CourseSchema>({
    name: 'target_audience',
    control: form.control
  });

  const { data } = useCategories();

  const [chaptersOpen, setChaptersOpen] = useState(false);

  const categories = data?.data ?? [];

  const type = watch('type');
  const isPremium = type === 'PREMIUM';

  return (
    <form
      className='grid grid-cols-[repeat(auto-fill,minmax(208px,1fr))] items-start gap-4 text-black'
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        id='name'
        type='text'
        label='Nama kelas'
        error={errors.name}
        disabled={loading}
        placeholder='Masukkan nama kelas'
        register={register('name')}
      />
      <Input
        id='code'
        type='text'
        label='Kode Kelas'
        error={errors.code}
        disabled={loading}
        placeholder='Masukkan kode kelas'
        register={register('code')}
      />
      <Input
        id='telegram'
        type='text'
        label='Link Telegram'
        error={errors.telegram}
        disabled={loading}
        placeholder='Masukkan link telegram kelas'
        register={register('telegram')}
      />
      <Controller
        name='course_category_id'
        control={control}
        render={({ field: { onChange } }) => (
          <Select
            label='Kategori'
            value={watch('course_category_id')}
            error={errors.course_category_id}
            options={categories}
            disabled={loading}
            onChange={onChange}
          />
        )}
      />
      <Controller
        name='difficulty'
        control={control}
        render={({ field: { onChange } }) => (
          <Select
            label='Level Kelas'
            value={watch('difficulty')}
            error={errors.difficulty}
            options={difficultyTypes}
            disabled={loading}
            onChange={onChange}
          />
        )}
      />
      <Controller
        name='type'
        control={control}
        render={({ field: { onChange } }) => (
          <Select
            label='Tipe Kelas'
            value={type}
            error={errors.type}
            options={courseTypes}
            disabled={loading}
            onChange={onChange}
          />
        )}
      />
      {isPremium && (
        <Input
          id='price'
          type='number'
          label='Harga'
          error={errors.price}
          disabled={loading}
          placeholder='Masukkan harga kelas'
          register={register('price', { valueAsNumber: true })}
        />
      )}
      <Input
        id='author'
        type='text'
        label='Author'
        error={errors.author}
        disabled={loading}
        placeholder='Masukkan author kelas'
        register={register('author')}
      />
      <Input
        id='intro_video'
        type='text'
        label='Link Intro Video'
        error={errors.intro_video}
        disabled={loading}
        placeholder='Masukkan video intro kelas'
        register={register('intro_video')}
      />
      <div className='col-span-full'>
        <Input
          id='description'
          type='textarea'
          label='Deskripsi'
          error={errors.description}
          disabled={loading}
          placeholder='Masukkan deskripsi kelas'
          register={register('description')}
        />
      </div>
      <div className='col-span-full'>
        <Accordion
          label='Chapter dan Materi'
          open={chaptersOpen}
          onToggle={setChaptersOpen}
        >
          <CourseChapterInput form={form} loading={loading} />
        </Accordion>
      </div>
      <div className='col-span-full'>
        <ArrayInput
          id='target_audience'
          errors={errors.target_audience}
          fields={fields}
          label='Target Audience'
          disabled={loading}
          placeholder='Masukkan target audience kelas'
          onAppend={() => append({ name: '' })}
          onRemove={(index) => () => remove(index)}
          register={register}
        />
      </div>
      <div className='col-span-full'>
        <Input
          id='onboarding_text'
          type='textarea'
          label='Onboarding Text'
          error={errors.onboarding_text}
          disabled={loading}
          placeholder='Masukkan onboarding text kelas'
          register={register('onboarding_text')}
        />
      </div>
      {children}
    </form>
  );
}
