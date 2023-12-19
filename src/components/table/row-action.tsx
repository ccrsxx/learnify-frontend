import { Menu } from '@headlessui/react';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import { MdMoreVert, MdEdit, MdDelete } from 'react-icons/md';
import { useCrudCourses } from '@/lib/hooks/use-crud-courses';
import { useModal } from '@/lib/hooks/use-modal';
import { Button } from '../ui/button';
import { ActionModal } from '../modal/action-modal';
import type { Course } from '@/lib/types/schema';
import type { MotionProps } from 'framer-motion';

type RowActionProps = {
  course: Course;
};

export function RowAction({ course }: RowActionProps): JSX.Element {
  const { open, openModal, closeModal } = useModal();

  const { queryClient, deleteCourseMutation } = useCrudCourses();

  const { id } = course;

  const handleDeleteCourse = (): void =>
    deleteCourseMutation.mutate(id, {
      onSuccess: () => {
        closeModal();

        void queryClient.invalidateQueries({
          queryKey: ['courses']
        });
      }
    });

  return (
    <>
      <ActionModal
        title='Delete course'
        description='Are you sure you want to delete this course?'
        mainBtnLabel='Delete'
        open={open}
        loading={deleteCourseMutation.isPending}
        action={handleDeleteCourse}
        closeModal={closeModal}
      />
      <Menu className='relative mx-auto inline-block' as='div'>
        {({ open }) => (
          <>
            <Menu.Button
              className='smooth-tab w-full justify-center rounded-full p-2 text-sm
                         transition hover:bg-black/5 focus-visible:bg-black/5'
            >
              <MdMoreVert className='text-xl text-black' />
            </Menu.Button>
            <AnimatePresence mode='wait'>
              {open && (
                <Menu.Items
                  className='fixed right-20 z-10 mt-2 grid w-36 origin-top-right gap-2
                             rounded-medium bg-white p-2 shadow-high outline-none xl:right-auto'
                  as={motion.div}
                  {...variants}
                  static
                >
                  <Menu.Item>
                    {({ active }) => (
                      <Button
                        className={clsx(
                          `flex items-center gap-2 rounded-low bg-primary-blue-300
                           p-2 text-white transition`,
                          active && 'brightness-90'
                        )}
                      >
                        <MdEdit className='text-lg' /> Edit
                      </Button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Button
                        className={clsx(
                          `flex items-center gap-2 rounded-low bg-primary-alert-error
                           p-2 text-white transition`,
                          active && 'brightness-90'
                        )}
                        onClick={openModal}
                      >
                        <MdDelete className='text-lg' /> Delete
                      </Button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              )}
            </AnimatePresence>
          </>
        )}
      </Menu>
    </>
  );
}

const variants: MotionProps = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', duration: 0.4 }
  },
  exit: { opacity: 0, y: 20, transition: { duration: 0.2 } }
};
