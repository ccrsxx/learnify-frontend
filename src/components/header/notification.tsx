import { Menu } from '@headlessui/react';
import { MdDoneAll, MdNotifications } from 'react-icons/md';
import { AnimatePresence, motion } from 'framer-motion';
import { useNotifications } from '@/lib/hooks/query/use-notifications';
import { useCrudNotifications } from '@/lib/hooks/mutation/use-crud-notifications';
import { Button } from '../ui/button';
import { NotificationItemSkeleton } from '../common/skeleton';
import { menuVariants } from './header-profile';
import { NotificationItem } from './notification-item';
import { NotificationItemAction } from './notification-item-action';

export function Notification(): JSX.Element {
  const { data, isLoading } = useNotifications();

  const {
    updateNotificationMutation,
    deleteNotificationMutation,
    readAllNotificationsMutation
  } = useCrudNotifications();

  const notifications = data?.data;

  const totalUnreadNotifications = notifications?.filter(
    ({ viewed }) => !viewed
  ).length;

  const notificationsAllRead = totalUnreadNotifications === 0;

  return (
    <Menu className='relative z-20' as='div'>
      {({ open }) => (
        <>
          <Menu.Button className='relative rounded-full p-2 text-white'>
            {!!totalUnreadNotifications && (
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
                className='smooth-tab absolute right-0 mt-3 w-[360px] origin-top-right
                           overflow-y-auto rounded-medium bg-white py-1 shadow-high'
                static
                as={motion.div}
                {...menuVariants}
              >
                <div className='flex items-center justify-between px-4 py-2'>
                  <div>
                    <p className='text-black'>Notifikasi</p>
                    <p className='text-sm text-gray-500'>
                      {totalUnreadNotifications} belum dibaca
                    </p>
                  </div>
                  <Button
                    className='clickable rounded-full bg-white brightness-95 enabled:hover:brightness-90
                               disabled:cursor-default disabled:opacity-50'
                    loading={readAllNotificationsMutation.isPending}
                    onClick={() => readAllNotificationsMutation.mutate()}
                    disabled={notificationsAllRead}
                  >
                    <MdDoneAll className='p-1 text-3xl text-primary-alert-success ' />
                  </Button>
                </div>
                <hr />
                <div className='grid h-full max-h-[60vh] min-h-[208px] divide-y overflow-y-auto'>
                  {isLoading ? (
                    Array.from({ length: 6 }).map((_, index) => (
                      <NotificationItemSkeleton key={index} />
                    ))
                  ) : notifications?.length ? (
                    notifications.map((notification, index) => (
                      <NotificationItem {...notification} key={notification.id}>
                        <NotificationItemAction
                          {...notification}
                          lastItem={
                            notifications.length > 1 &&
                            index === notifications.length - 1
                          }
                          deleteNotificationMutation={
                            deleteNotificationMutation
                          }
                          updateNotificationMutation={
                            updateNotificationMutation
                          }
                        />
                      </NotificationItem>
                    ))
                  ) : (
                    <section className='flex items-center justify-center'>
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
