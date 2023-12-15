import { clsx } from 'clsx';
import { Dialog } from '@headlessui/react';
import { Button } from '../ui/button';

type ActionModalProps = {
  title: string;
  description: string;
  mainBtnLabel: string;
  secondaryBtnLabel?: string;
  mainButtonClassName?: string;
  secondaryButtonClassName?: string;
  action: () => void;
  closeModal: () => void;
};

export function ActionModal({
  title,
  description,
  mainBtnLabel,
  secondaryBtnLabel,
  mainButtonClassName,
  secondaryButtonClassName,
  action,
  closeModal
}: ActionModalProps): JSX.Element {
  return (
    <div className='grid gap-6'>
      <div className='grid gap-2'>
        <Dialog.Title className='text-xl font-bold'>{title}</Dialog.Title>
        <Dialog.Description className='text-light-secondary dark:text-dark-secondary'>
          {description}
        </Dialog.Description>
      </div>
      <div className='grid gap-4'>
        <Button className={clsx(mainButtonClassName)} onClick={action}>
          {mainBtnLabel}
        </Button>
        <Button className={clsx(secondaryButtonClassName)} onClick={closeModal}>
          {secondaryBtnLabel ?? 'Cancel'}
        </Button>
      </div>
    </div>
  );
}
