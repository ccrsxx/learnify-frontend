import { clsx } from 'clsx';
import { Menu } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { MdCheck, MdDelete, MdMoreVert } from 'react-icons/md';
import { preventBubbling } from '@/lib/helper';
import { Button } from '../ui/button';
import { menuVariants } from './header-profile';
import type { CrudNotifications } from '@/lib/hooks/mutation/use-crud-notifications';
import type { UserNotification } from '@/lib/types/schema';

type NotificationItemActionProps = UserNotification &
  Pick<
    CrudNotifications,
    'updateNotificationMutation' | 'deleteNotificationMutation'
  > & {
    lastItem?: boolean;
  };

export function NotificationItemAction({
  id,
  viewed,
  lastItem,
  updateNotificationMutation,
  deleteNotificationMutation
}: NotificationItemActionProps): JSX.Element {
  return (
    <Menu className='absolute right-4 top-1/2 z-10 -translate-y-4' as='div'>
      {({ open }) => (
        <>
          <Menu.Button
            className={clsx(
              `clickable rounded-full bg-white opacity-0 shadow-low brightness-95 
               hover:brightness-90 group-hover:opacity-100`,
              open && 'opacity-100 brightness-90'
            )}
          >
            <MdMoreVert className='p-1 text-3xl text-gray-700' />
          </Menu.Button>
          <AnimatePresence mode='wait'>
            {open && (
              <Menu.Items
                className={clsx(
                  `smooth-tab absolute right-0 mt-1 w-60 origin-top-right
                   rounded-medium bg-white py-1 shadow-high`,
                  lastItem && 'bottom-full mb-2'
                )}
                static
                as={motion.div}
                {...menuVariants}
              >
                <Menu.Item>
                  {({ active }) => (
                    <Button
                      className={clsx(
                        `flex w-full items-center gap-2 rounded-none p-3 text-primary-alert-success
                         transition enabled:active:bg-gray-200 disabled:opacity-50`,
                        !updateNotificationMutation.isPending &&
                          active &&
                          'bg-gray-100'
                      )}
                      onClick={preventBubbling({
                        callback: () => updateNotificationMutation.mutate(id),
                        preventDefault: true
                      })}
                      loading={updateNotificationMutation.isPending}
                      disabled={viewed}
                    >
                      <MdCheck className='text-2xl' />
                      Tandai sudah dibaca
                    </Button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Button
                      className={clsx(
                        `flex w-full items-center gap-2 rounded-none p-3
                         text-primary-alert-error transition-colors active:bg-gray-200`,
                        !deleteNotificationMutation.isPending &&
                          active &&
                          'bg-gray-100'
                      )}
                      onClick={preventBubbling({
                        callback: () => deleteNotificationMutation.mutate(id),
                        preventDefault: true
                      })}
                      loading={deleteNotificationMutation.isPending}
                    >
                      <MdDelete className='text-2xl' />
                      Hapus notifikasi
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
