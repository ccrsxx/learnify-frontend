import { z } from 'zod';
import { useEffect, useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { TYPES, DIFFICULTIES } from '@/lib/types/enum';
import { getImagesData } from '@/lib/image';
import { sleep } from '@/lib/helper';
import { Input } from '../ui/input';
import { Select } from '../ui/select';
import { ImageUpload } from './image-upload';
import { ArrayInput } from './array-input';
import type { PropsWithChildren, ChangeEvent, ClipboardEvent } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import type { ImageData } from '@/lib/types/file';
import type { CourseCategory } from '@/lib/types/schema';

const courseSchema = z.object({
  name: z.string().trim().min(1, { message: 'Nama kelas tidak boleh kosong' }),
  code: z.string().trim().min(1, { message: 'Kode kelas tidak boleh kosong' }),
  telegram: z
    .string()
    .trim()
    .min(1, { message: 'Link telegram tidak boleh kosong' })
    .url({ message: 'Link telegram tidak valid' }),
  course_category_id: z
    .string({ required_error: 'Kategori tidak boleh kosong' })
    .uuid({ message: 'Kategori tidak valid' }),
  difficulty: z.enum(DIFFICULTIES, {
    required_error: 'Level tidak boleh kosong'
  }),
  type: z.enum(TYPES, { required_error: 'Tipe kelas tidak boleh kosong' }),
  price: z
    .number({ invalid_type_error: 'Harga tidak boleh kosong' })
    .int({ message: 'Harga tidak boleh desimal' })
    .min(1, { message: 'Harga tidak boleh kosong' }),
  target_audience: z
    .array(
      z.object({
        name: z
          .string()
          .trim()
          .min(1, { message: 'Target audience tidak boleh kosong' })
      })
    )
    .max(5, { message: 'Target audience tidak boleh lebih dari 3' }),
  description: z
    .string()
    .trim()
    .min(1, { message: 'Deskripsi tidak boleh kosong' }),
  onboarding_text: z
    .string()
    .trim()
    .min(1, { message: 'Onboarding text tidak boleh kosong' })
});

type CourseSchema = z.infer<typeof courseSchema>;

type NewCourseFormProps = PropsWithChildren<{
  categories: CourseCategory[] | undefined;
}>;

export function NewCourseForm({
  categories,
  children
}: NewCourseFormProps): JSX.Element {
  const {
    control,
    formState: { errors },
    watch,
    register,
    handleSubmit
  } = useForm<CourseSchema>({
    defaultValues: { target_audience: [{ name: '' }] },
    resolver: zodResolver(courseSchema)
  });

  const { fields, append, remove } = useFieldArray<CourseSchema>({
    control,
    name: 'target_audience'
  });

  const [_image, setImage] = useState<File | null>(null);
  const [imageData, setImageData] = useState<ImageData | null>(null);

  const [_formLoading, setFormLoading] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => cleanImage, [imageData]);

  const onSubmit: SubmitHandler<CourseSchema> = async (
    _data
  ): Promise<void> => {
    setFormLoading(true);

    await sleep(1000);

    // const formData = new FormData();

    // for (const key in data) {
    // formData.append(key, data[key]);
    // }

    setFormLoading(false);
  };

  const handleImageUpload = (
    e: ChangeEvent<HTMLInputElement> | ClipboardEvent<HTMLTextAreaElement>
  ): void => {
    const isClipboardEvent = 'clipboardData' in e;

    if (isClipboardEvent) {
      const isPastingText = e.clipboardData.getData('text');
      if (isPastingText) return;
    }

    const files = isClipboardEvent ? e.clipboardData.files : e.target.files;

    const imagesData = getImagesData(files);

    if (!imagesData) {
      toast.error('Gambar tidak valid');
      return;
    }

    const {
      imagesPreviewData: [imagePreviewData],
      selectedImagesData: [selectedImageData]
    } = imagesData;

    cleanImage();

    setImage(selectedImageData);
    setImageData(imagePreviewData);
  };

  const removeImage = (): void => {
    cleanImage();

    setImage(null);
    setImageData(null);
  };

  const cleanImage = (): void => URL.revokeObjectURL(imageData?.src as string);

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
      <div className='col-span-full grid gap-2'>
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
      <div className='col-span-full'>
        <ImageUpload
          selectedImage={imageData}
          removeImage={removeImage}
          onImageUpload={handleImageUpload}
        />
      </div>
      {children}
    </form>
  );
}

const courseTypes = TYPES.map((type) => ({
  id: type,
  name: type.toLowerCase()
}));

const difficultyTypes = DIFFICULTIES.map((type) => ({
  id: type,
  name: type.toLowerCase()
}));
