import { Dialog } from '@headlessui/react';
import { Toaster } from 'react-hot-toast';
import { MdClose } from 'react-icons/md';
import { Button } from '../ui/button';
import { Modal } from './modal';
import type { PropsWithChildren } from 'react';
import type { Course } from '@/lib/types/schema';

type NewCourseModalProps = PropsWithChildren<{
  open: boolean;
  course?: Course;
  closeModal: () => void;
}>;

export function NewCourseModal({
  open,
  children,
  closeModal
}: NewCourseModalProps): JSX.Element {
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
      {children}
      <Toaster position='bottom-center' />
    </Modal>
  );
}
