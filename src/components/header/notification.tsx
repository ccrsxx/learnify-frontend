import { Menu } from '@headlessui/react';
import { MdNotifications } from 'react-icons/md';
import { AnimatePresence, motion } from 'framer-motion';
import { useNotifications } from '@/lib/hooks/query/use-notifications';
import { NotificationItemSkeleton } from '../common/skeleton';
import { menuVariants } from './header-profile';
import { NotificationItem } from './notification-item';

export function Notification(): JSX.Element {
  const { data, isLoading } = useNotifications();

  const notifications = data?.data;

  const totalUnread = notifications?.filter(({ viewed }) => !viewed).length;

  return (
    <Menu className='relative' as='div'>
      {({ open }) => (
        <>
          <Menu.Button className='relative rounded-full p-2 text-white'>
            {!!totalUnread && (
              <span className='absolute right-0 flex h-3 w-3'>
                <span
                  className='absolute inline-flex h-full w-full animate-ping 
                             rounded-full bg-sky-400 opacity-75'
                />
                <span className='relative inline-flex h-3 w-3 rounded-full bg-primary-blue-300' />
              </span>
            )}
            <MdNotifications className='text-4xl' />
          </Menu.Button>
          <AnimatePresence mode='wait'>
            {open && (
              <Menu.Items
                className='smooth-tab absolute right-0 z-20 mt-3 w-80 origin-top-right
                           overflow-hidden overflow-y-auto rounded-medium bg-white py-1 shadow-high'
                static
                as={motion.div}
                {...menuVariants}
              >
                <div className='max-h-[60vh] divide-y overflow-y-auto'>
                  <div className='px-4 py-2'>
                    <p className='text-black'>Notification</p>
                    <p className='text-sm text-gray-500'>
                      {totalUnread} unread
                    </p>
                  </div>
                  {isLoading ? (
                    Array.from({ length: 12 }).map((_, index) => (
                      <NotificationItemSkeleton key={index} />
                    ))
                  ) : notifications?.length ? (
                    notifications.map((notification) => (
                      <NotificationItem
                        key={notification.id}
                        {...notification}
                      />
                    ))
                  ) : (
                    <section className='flex justify-center'>
                      <p className='max-w-md p-4 font-medium text-black'>
                        Tidak ada notifikasi
                      </p>
                    </section>
                  )}
                </div>
              </Menu.Items>
            )}
          </AnimatePresence>
        </>
      )}
    </Menu>
  );
}
