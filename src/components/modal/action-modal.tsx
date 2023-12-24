import { clsx } from 'clsx';
import { Dialog } from '@headlessui/react';
import { Button } from '../ui/button';
import { Modal } from './modal';

type ActionModalProps = {
  open: boolean;
  title: string;
  loading?: boolean;
  description: string;
  mainBtnLabel: string;
  secondaryBtnLabel?: string;
  mainButtonClassName?: string;
  secondaryButtonClassName?: string;
  action: () => void;
  closeModal: () => void;
};

export function ActionModal({
  open,
  title,
  loading,
  description,
  mainBtnLabel,
  secondaryBtnLabel,
  mainButtonClassName,
  secondaryButtonClassName,
  action,
  closeModal
}: ActionModalProps): JSX.Element {
  return (
    <Modal
      modalClassName='max-w-xs grid gap-6 bg-white w-full p-6 rounded-high text-black'
      open={open}
      closeModal={closeModal}
    >
      <div className='grid gap-2'>
        <Dialog.Title className='text-xl font-bold'>{title}</Dialog.Title>
        <Dialog.Description>{description}</Dialog.Description>
      </div>
      <div className='grid gap-4'>
        <Button
          className={clsx(
            'bg-primary-alert-error p-2 text-white',
            mainButtonClassName
          )}
          loading={loading}
          onClick={action}
        >
          {mainBtnLabel}
        </Button>
        <Button
          className={clsx(
            'bg-primary-blue-300 p-2 text-white',
            secondaryButtonClassName
          )}
          onClick={closeModal}
        >
          {secondaryBtnLabel ?? 'Cancel'}
        </Button>
      </div>
    </Modal>
  );
}
