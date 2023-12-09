import { Menu } from '@headlessui/react';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import { MdMoreVert, MdEdit, MdDelete } from 'react-icons/md';
import { Button } from '../ui/button';
import type { MotionProps } from 'framer-motion';

export function RowAction(): JSX.Element {
  return (
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
                className='absolute right-0 z-10 mt-2 grid w-36 origin-top-right
                           gap-2 rounded-medium bg-white p-2 shadow-high outline-none'
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
