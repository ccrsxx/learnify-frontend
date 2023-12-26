'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/context/auth-context';
import { emailSchema, nameSchema, phoneNumberSchema } from '@/lib/validation';
import { NEXT_PUBLIC_BACKEND_URL } from '@/lib/env';
import { getImagesData } from '@/lib/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AvatarUpload } from '@/components/ui/avatar-upload';
import type { ChangeEvent, ClipboardEvent } from 'react';
import type { User } from '@/lib/types/schema';
import type { ImageData } from '@/lib/types/file';
import type { APIResponse } from '@/lib/types/api';
import type { DefaultValues, SubmitHandler } from 'react-hook-form';

const profileSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone_number: phoneNumberSchema
});

type ProfileSchema = z.infer<typeof profileSchema>;

export default function Settings(): JSX.Element {
  const { user, token, updateUser } = useAuth();

  const {
    formState: { errors },
    register,
    handleSubmit
  } = useForm<ProfileSchema>({
    defaultValues: setInitialValues(user!),
    resolver: zodResolver(profileSchema)
  });

  const [image, setImage] = useState<File | null>(null);
  const [imageData, setImageData] = useState<ImageData | null>(() =>
    user?.image
      ? {
          src: user.image,
          alt: user.name
        }
      : null
  );

  const [errorServer, setErrorServer] = useState<string | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => cleanImage, [imageData]);

  const onSubmit: SubmitHandler<ProfileSchema> = async (
    submittedData
  ): Promise<void> => {
    setFormLoading(true);
    setErrorServer(null);

    const formData = new FormData();

    for (const [key, value] of Object.entries(submittedData))
      formData.append(key, value);

    const parsedImage = image ?? imageData?.src;

    if (parsedImage) formData.append('image', parsedImage);

    try {
      const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/users/me`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });

      const { message, data } = (await response.json()) as APIResponse<User>;

      if (!response.ok) {
        const errorMessage = message.includes('Email')
          ? 'Maaf, email sudah digunakan'
          : message.includes('Phone')
          ? 'Maaf, nomor telepon sudah digunakan'
          : message;

        toast.error(errorMessage);
        setErrorServer(errorMessage);

        return;
      }

      toast.success('Berhasil memperbarui profil');

      const uploadedImage = data?.image ?? null;

      updateUser({ ...user!, ...submittedData, image: uploadedImage });

      setImage(null);

      setImageData(
        uploadedImage
          ? {
              src: uploadedImage,
              alt: user!.name
            }
          : null
      );
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      toast.error('Terjadi kesalahan. Silahkan coba lagi');
    } finally {
      setFormLoading(false);
    }
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

  const cleanImage = (): void => URL.revokeObjectURL(imageData?.src as string);

  const serverEmailError = errorServer?.includes('email');
  const serverPhoneNumberError = errorServer?.includes('nomor');

  return (
    <section className='mx-auto w-full max-w-md rounded-medium p-6 shadow-low'>
      <form className='grid w-full gap-4' onSubmit={handleSubmit(onSubmit)}>
        <AvatarUpload
          loading={formLoading}
          selectedImage={imageData?.src}
          onImageUpload={handleImageUpload}
        />
        <Input
          id='name'
          type='text'
          label='Nama'
          error={errors.name}
          disabled={formLoading}
          placeholder='Masukkan nama'
          register={register('name')}
        />
        <Input
          id='email'
          type='email'
          label='Email'
          error={errors.email}
          disabled={formLoading}
          placeholder='Masukkan email'
          overrideError={serverEmailError}
          register={register('email')}
        />
        <Input
          id='phone_number'
          type='text'
          label='Nomor Telepon'
          error={errors.phone_number}
          disabled={formLoading}
          overrideError={serverPhoneNumberError}
          placeholder='Masukkan nomor telepon'
          register={register('phone_number')}
        />
        <Button
          type='submit'
          loading={formLoading}
          className='mt-2 rounded-high bg-primary-blue-500 px-4 py-3'
        >
          Simpan
        </Button>
      </form>
    </section>
  );
}

function setInitialValues(user: User): DefaultValues<ProfileSchema> {
  const { name, email, phone_number } = user;

  return {
    name,
    email,
    phone_number
  };
}
