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
          <Menu.Button className='smooth-tab relative flex items-center rounded-full text-white'>
            {!!totalUnreadNotifications && (
              <span className='absolute -right-1 top-0 flex h-4 w-4'>
                <span
                  className='absolute inline-block h-full w-full animate-ping 
                             rounded-full bg-primary-blue-300 opacity-75'
                />
                <span
                  className='relative inline-flex h-full w-full items-center justify-center rounded-full
                             bg-primary-alert-error text-center text-xs'
                >
                  {totalUnreadNotifications}
                </span>
              </span>
            )}
            <MdNotifications className='text-4xl' />
          </Menu.Button>
          <AnimatePresence mode='wait'>
            {open && (
              <Menu.Items
                className='smooth-tab absolute -right-full mt-3 w-80 origin-top-right overflow-y-auto rounded-medium
                           bg-white py-1 shadow-high md:right-0 md:w-[360px]'
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
                    <AnimatePresence mode='popLayout' initial={false}>
                      {notifications.map((notification, index) => (
                        <NotificationItem
                          {...notification}
                          key={notification.id}
                        >
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
                      ))}
                    </AnimatePresence>
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
