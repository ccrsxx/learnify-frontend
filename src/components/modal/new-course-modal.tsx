import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Dialog } from '@headlessui/react';
import { toast } from 'react-hot-toast';
import { MdClose } from 'react-icons/md';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/lib/context/auth-context';
import { getImagesData } from '@/lib/image';
import { useCrudCourses } from '@/lib/hooks/mutation/use-crud-courses';
import { courseSchema } from '@/lib/form/schema';
import { Button } from '../ui/button';
import { ImageUpload } from '../dashboard/image-upload';
import { CourseForm } from '../dashboard/course-form';
import { Modal } from './modal';
import type { ChangeEvent, ClipboardEvent } from 'react';
import type { DefaultValues, SubmitHandler } from 'react-hook-form';
import type { Entries } from '@/lib/types/helper';
import type { ImageData } from '@/lib/types/file';
import type { Course } from '@/lib/types/schema';
import type { CourseSchema } from '@/lib/form/schema';

type NewCourseModalProps = {
  open: boolean;
  course?: Course;
  closeModal: () => void;
};

export function NewCourseModal({
  open,
  course,
  closeModal
}: NewCourseModalProps): JSX.Element {
  const { user } = useAuth();

  const { createCourseMutation, updateCourseMutation } = useCrudCourses();

  const form = useForm<CourseSchema>({
    defaultValues: setInitialValues(course),
    resolver: zodResolver(courseSchema)
  });

  const [image, setImage] = useState<File | null>(null);
  const [imageData, setImageData] = useState<ImageData | null>(() =>
    course?.image
      ? {
          src: course.image,
          alt: course.name
        }
      : null
  );

  const { watch, reset, setValue } = form;

  const type = watch('type');

  useEffect(() => {
    if (type === 'PREMIUM') return;

    setValue('price', null);
  }, [type, setValue]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => cleanImage, [imageData]);

  const onSubmit: SubmitHandler<CourseSchema> = ({
    type,
    price,
    course_chapter,
    target_audience,
    ...rest
  }): void => {
    const parsedTargetAudience = target_audience.map(({ name }) => name);

    const parsedCourseChapters = course_chapter?.map(
      ({ _id, course_material, ...rest }, i) => ({
        ...rest,
        id: _id,
        course_id: course?.id,
        order_index: i + 1,
        course_material: course_material.map(({ _id, ...rest }, i) => ({
          ...rest,
          id: _id,
          order_index: i + 1
        }))
      })
    );

    const parsedCourse: Partial<Course> = {
      ...rest,
      user_id: user?.id,
      premium: type === 'PREMIUM'
    };

    const formData = new FormData();

    for (const [key, value] of Object.entries(parsedCourse) as Entries<
      Omit<
        CourseSchema,
        'price' | 'type' | 'course_chapter' | 'target_audience'
      >
    >)
      formData.append(key, value);

    formData.append('course_chapter', JSON.stringify(parsedCourseChapters));
    formData.append('target_audience', JSON.stringify(parsedTargetAudience));

    const parsedPrice = price ?? 0;

    formData.append('price', parsedPrice.toString());

    const parsedImage = image ?? imageData?.src;

    if (parsedImage) formData.append('image', parsedImage);

    if (course) {
      updateCourseMutation.mutate(
        { id: course.id, data: formData },
        {
          onSuccess: () => {
            toast.success('Kursus berhasil di perbarui');
            closeModal();
          },
          onError: ({ message }) => {
            // eslint-disable-next-line no-console
            console.error(message);
            toast.error('Gagal mengupdate kursus');
          }
        }
      );
      return;
    }

    createCourseMutation.mutate(formData, {
      onSuccess: () => {
        toast.success('Kursus berhasil dibuat');
        closeModal();
        reset();
      },
      onError: ({ message }) => {
        // eslint-disable-next-line no-console
        console.error(message);

        toast.error('Gagal membuat kursus');
      }
    });
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

  const formLoading =
    createCourseMutation.isPending || updateCourseMutation.isPending;

  return (
    <Modal
      modalClassName='grid gap-4 max-w-4xl w-full bg-white p-6 rounded-high'
      open={open}
      closeModal={closeModal}
    >
      <div className='flex items-center justify-between gap-4'>
        <Dialog.Title className='text-2xl font-bold text-primary-blue-500'>
          Tambah kelas
        </Dialog.Title>
        <Button
          className='smooth-tab rounded-full p-2 text-xl text-black transition hover:bg-black/5'
          onClick={closeModal}
        >
          <MdClose />
        </Button>
      </div>
      <CourseForm form={form} loading={formLoading} onSubmit={onSubmit}>
        <div className='col-span-full'>
          <ImageUpload
            loading={formLoading}
            selectedImage={imageData}
            removeImage={removeImage}
            onImageUpload={handleImageUpload}
          />
        </div>
        <div className='col-span-full mt-2 grid grid-cols-2 gap-4 text-white'>
          <Button
            className='bg-primary-alert-error px-4 py-3 transition hover:brightness-90'
            onClick={closeModal}
          >
            Kembali
          </Button>
          <Button
            type='submit'
            className='bg-primary-blue-500 px-4 py-3 transition hover:brightness-90'
            loading={formLoading}
          >
            Simpan
          </Button>
        </div>
      </CourseForm>
    </Modal>
  );
}

function setInitialValues(course?: Course): DefaultValues<CourseSchema> {
  if (!course)
    return {
      course_chapter: [
        { name: '', course_material: [{ name: '', video: '' }] }
      ],
      target_audience: [{ name: '' }]
    };

  const { premium, target_audience, course_chapter } = course;

  const parsedCourseChapters = course_chapter?.map(
    ({ id, course_material, ...rest }) => ({
      ...rest,
      _id: id,
      course_material: course_material.map(({ id, ...rest }) => ({
        ...rest,
        _id: id
      }))
    })
  );

  return {
    ...course,
    type: premium ? 'PREMIUM' : 'FREE',
    course_chapter: parsedCourseChapters,
    target_audience: target_audience.map((name) => ({ name }))
  };
}
