import { clsx } from 'clsx';
import { Menu } from '@headlessui/react';
import { MdCircleNotifications } from 'react-icons/md';
import { formatRelativeTime } from '@/lib/format';
import { preventBubbling } from '@/lib/helper';
import type { PropsWithChildren } from 'react';
import type { UserNotification } from '@/lib/types/schema';

type NotificationItemProps = PropsWithChildren<UserNotification>;

export function NotificationItem({
  name,
  viewed,
  children,
  created_at,
  description
}: NotificationItemProps): JSX.Element {
  return (
    <Menu.Item>
      {({ active }) => (
        <div
          className={clsx(
            `group relative flex gap-3 p-3 transition-colors 
             [&:has(div.absolute>button.opacity-100)+div>div.absolute>button]:opacity-0`,
            active && 'bg-gray-100'
          )}
          onClick={preventBubbling({ preventDefault: true })}
        >
          <MdCircleNotifications className='shrink-0 text-4xl text-primary-blue-300' />
          <div className='grid gap-1'>
            <p className='text-black'>{name}</p>
            <p className='text-sm text-gray-500'>{description}</p>
            <p className='text-sm text-gray-400'>
              {formatRelativeTime(new Date(created_at))}
            </p>
          </div>
          {children}
          <span
            className={clsx(
              'absolute right-4 top-4 h-2 w-2 rounded-full transition-colors',
              viewed ? 'bg-primary-alert-success' : 'bg-primary-alert-error'
            )}
          />
        </div>
      )}
    </Menu.Item>
  );
}
