import { toast } from 'react-hot-toast';
import { Dialog } from '@headlessui/react';
import { useOnboardingStatus } from '@/lib/hooks/mutation/use-onboarding-status';
import { LazyImage } from '../ui/lazy-image';
import { Button } from '../ui/button';
import { Modal } from './modal';
import type { Course } from '@/lib/types/schema';

type OnboardingModalProps = {
  open: boolean;
  course: Course;
  closeModal: () => void;
};

export function OnboardingModal({
  open,
  course: { id: courseId, onboarding_text, user_course },
  closeModal
}: OnboardingModalProps): JSX.Element {
  const { updateOnboardingStatus } = useOnboardingStatus(courseId);

  const handleOnboardingComplete = (): void => {
    const userCourseId = user_course?.[0]?.id as string;

    updateOnboardingStatus.mutate(userCourseId, {
      onSuccess: () => {
        closeModal();

        toast.success('Selamat belajar!');
      },
      onError: ({ message }) => {
        // eslint-disable-next-line no-console
        console.error(message);

        toast.error('Gagal menyelesaikan onboarding');
      }
    });
  };

  return (
    <Modal
      open={open}
      modalClassName='bg-white grid max-w-lg justify-items-center gap-8 p-8 rounded-high'
      closeModal={closeModal}
    >
      <div className='grid justify-items-center gap-6'>
        <Dialog.Title className='text-3xl font-bold text-primary-blue-500'>
          Onboarding...
        </Dialog.Title>
        <LazyImage
          className='h-48 w-48'
          width={192}
          height={192}
          src='/assets/onboarding.svg'
          alt='Onboarding'
        />
        <p className='font-bold text-black'>
          Persiapkan hal berikut untuk belajar yang maksimal:
        </p>
        <Dialog.Description className='white whitespace-pre-line text-center text-sm text-black'>
          {onboarding_text}
        </Dialog.Description>
      </div>
      <Button
        className='clickable rounded-high bg-primary-blue-500 px-12 py-3 font-medium'
        loading={updateOnboardingStatus.isPending}
        onClick={handleOnboardingComplete}
      >
        Ikuti Kelas
      </Button>
    </Modal>
  );
}
