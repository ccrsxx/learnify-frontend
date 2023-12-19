import { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Dialog } from '@headlessui/react';
import { toast } from 'react-hot-toast';
import { MdClose } from 'react-icons/md';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/lib/context/auth-context';
import { getImagesData } from '@/lib/image';
import { useCrudCourses } from '@/lib/hooks/use-crud-courses';
import { generateRandomCourse } from '@/lib/random';
import { courseSchema } from '@/lib/form/schema';
import { Button } from '../ui/button';
import { ImageUpload } from '../dashboard/image-upload';
import { CourseForm } from '../dashboard/course-form';
import { Modal } from './modal';
import type { ChangeEvent, ClipboardEvent } from 'react';
import type { SubmitHandler } from 'react-hook-form';
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

  const fieldArray = useFieldArray<CourseSchema>({
    name: 'target_audience',
    control: form.control
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

  const [formLoading, setFormLoading] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => cleanImage, [imageData]);

  const onSubmit: SubmitHandler<CourseSchema> = ({
    type,
    target_audience,
    ...rest
  }): void => {
    setFormLoading(true);

    const parsedTargetAudience = target_audience.map(({ name }) => name);

    const parsedCourse: Partial<Course> = {
      ...rest,
      user_id: user?.id,
      premium: type === 'PREMIUM',
      target_audience: parsedTargetAudience
    };

    const formData = new FormData();

    for (const [key, value] of Object.entries(
      parsedCourse
    ) as Entries<CourseSchema>)
      if (key !== 'target_audience') formData.append(key, value as string);

    formData.append('target_audience', JSON.stringify(parsedTargetAudience));

    if (image) formData.append('image', image);
    else if (imageData) formData.append('image', imageData.src);

    if (course) {
      updateCourseMutation.mutate(
        { id: course.id, data: formData },
        {
          onSuccess: ({ message }) => {
            toast.success(message);
            closeModal();
          },
          onError: ({ message }) => {
            toast.error(message);
          },
          onSettled: () => {
            setFormLoading(false);
          }
        }
      );
      return;
    }

    createCourseMutation.mutate(formData, {
      onSuccess: ({ message }) => {
        toast.success(message);
        closeModal();
      },
      onError: ({ message }) => {
        toast.error(message);
      },
      onSettled: () => {
        setFormLoading(false);
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

  return (
    <Modal
      modalClassName='grid gap-4 max-w-4xl w-full bg-white p-6 rounded-medium'
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
      <CourseForm form={form} fieldArray={fieldArray} onSubmit={onSubmit}>
        <div className='col-span-full'>
          <ImageUpload
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

function setInitialValues(course?: Course): CourseSchema {
  if (!course)
    return {
      ...generateRandomCourse(),
      type: 'PREMIUM',
      target_audience: [{ name: 'Test' }],
      course_category_id: '5db0a017-6041-4d9a-8f44-5fca03d5378a'
    };

  const { premium, target_audience, course_category_id } = course;

  return {
    ...course,
    type: premium ? 'PREMIUM' : 'FREE',
    target_audience: target_audience.map((name) => ({ name })),
    course_category_id
  };
}
