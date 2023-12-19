import { Controller } from 'react-hook-form';
import { courseTypes, difficultyTypes } from '@/lib/form/schema';
import { useCategories } from '@/lib/hooks/use-categories';
import { Input } from '../ui/input';
import { Select } from '../ui/select';
import { ArrayInput } from '../dashboard/array-input';
import type { PropsWithChildren } from 'react';
import type {
  SubmitHandler,
  UseFormReturn,
  UseFieldArrayReturn
} from 'react-hook-form';
import type { CourseSchema } from '@/lib/form/schema';

type CourseFormProps = PropsWithChildren<{
  form: UseFormReturn<CourseSchema>;
  fieldArray: UseFieldArrayReturn<CourseSchema>;
  onSubmit: SubmitHandler<CourseSchema>;
}>;

export function CourseForm({
  form,
  children,
  fieldArray,
  onSubmit
}: CourseFormProps): JSX.Element {
  const {
    control,
    formState: { errors },
    watch,
    register,
    handleSubmit
  } = form;

  const { fields, append, remove } = fieldArray;

  const { data } = useCategories();

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
        placeholder='Masukkan nama kelas'
        register={register('name')}
      />
      <Input
        id='code'
        type='text'
        label='Kode Kelas'
        error={errors.code}
        placeholder='Masukkan kode kelas'
        register={register('code')}
      />
      <Input
        id='telegram'
        type='text'
        label='Link Telegram'
        error={errors.telegram}
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
          placeholder='Masukkan harga kelas'
          register={register('price', { valueAsNumber: true })}
        />
      )}
      <Input
        id='author'
        type='text'
        label='Author'
        error={errors.author}
        placeholder='Masukkan author kelas'
        register={register('author')}
      />
      <Input
        id='intro_video'
        type='text'
        label='Link Intro Video'
        error={errors.intro_video}
        placeholder='Masukkan video intro kelas'
        register={register('intro_video')}
      />
      <div className='col-span-full'>
        <Input
          id='description'
          type='textarea'
          label='Deskripsi'
          error={errors.description}
          placeholder='Masukkan deskripsi kelas'
          register={register('description')}
        />
      </div>
      <div className='col-span-full'>
        <ArrayInput
          id='target_audience'
          errors={errors.target_audience}
          fields={fields}
          label='Target Audience'
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
          label='Onboarding text'
          error={errors.onboarding_text}
          placeholder='Masukkan onboarding text kelas'
          register={register('onboarding_text')}
        />
      </div>
      {children}
    </form>
  );
}
