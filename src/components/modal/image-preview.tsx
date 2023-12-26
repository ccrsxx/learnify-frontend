'use client';

import Image from 'next/image';
import { clsx } from 'clsx';
import { useModal } from '@/lib/hooks/use-modal';
import { preventBubbling } from '@/lib/helper';
import { Button } from '../ui/button';
import { LazyImage } from '../ui/lazy-image';
import { Modal } from './modal';
import type { PropsWithChildren } from 'react';
import type { ImageProps } from 'next/image';

type ImagePreviewProps = PropsWithChildren<
  Omit<ImageProps, 'src'> & {
    src: string;
    customLink?: string;
    wrapperClassName?: string;
  }
>;

export function ImagePreview({
  src,
  alt,
  children,
  className,
  customLink,
  wrapperClassName,
  ...rest
}: ImagePreviewProps): JSX.Element {
  const { open, openModal, closeModal } = useModal();

  customLink ??= src;

  return (
    <>
      <Modal open={open} closeModal={closeModal}>
        <div className='relative'>
          <div className='group relative max-w-6xl'>
            <Image
              {...rest}
              className='max-h-[70vh] w-fit rounded-medium object-contain'
              src={src}
              alt={alt}
            />
            <a
              className='absolute bottom-0 right-0 mx-2 mb-2 translate-y-4 rounded-low bg-white/40 
                         px-2 py-1  text-sm text-black/80 opacity-0 outline-none transition hover:!bg-primary-blue-500 
                         hover:text-white focus-visible:translate-y-0 focus-visible:!bg-primary-blue-500
                         focus-visible:text-white focus-visible:opacity-100 group-hover:translate-y-0 
                         group-hover:opacity-100 dark:bg-black/40 dark:text-white/80'
              href={customLink}
              target='_blank'
              rel='noreferrer'
              onClick={preventBubbling()}
            >
              {alt}
            </a>
          </div>
          <a
            className='absolute -bottom-7 left-0 font-medium text-black/80 underline decoration-transparent 
                       underline-offset-2 outline-none transition-colors hover:text-black hover:decoration-black
                       focus-visible:text-black focus-visible:decoration-inherit dark:text-white/80 
                       dark:hover:text-white dark:hover:decoration-white dark:focus-visible:text-white'
            href={customLink}
            target='_blank'
            rel='noreferrer'
            onClick={preventBubbling()}
          >
            Open original
          </a>
        </div>
      </Modal>
      <Button
        className={clsx('smooth-tab grid', wrapperClassName)}
        onClick={openModal}
      >
        <LazyImage
          {...rest}
          className={clsx(
            'mx-auto cursor-pointer rounded-medium transition hover:brightness-75',
            className
          )}
          src={src}
          alt={alt}
          title={alt}
        />
        {children}
      </Button>
    </>
  );
}
