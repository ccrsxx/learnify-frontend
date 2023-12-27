import { clsx } from 'clsx';
import { Menu } from '@headlessui/react';
import { MdCircleNotifications } from 'react-icons/md';
import { formatRelativeTime } from '@/lib/format';

import type { UserNotification } from '@/lib/types/schema';

export function NotificationItem({
  name,
  viewed,
  description,
  created_at
}: UserNotification): JSX.Element {
  return (
    <Menu.Item>
      {({ active }) => (
        <div
          className={clsx(
            'relative flex cursor-pointer gap-3 p-3 transition-colors',
            active && 'bg-gray-100'
          )}
        >
          <MdCircleNotifications className='shrink-0 text-4xl text-primary-blue-300' />
          <div className='grid gap-1'>
            <p className='text-black'>{name}</p>
            <p className='text-sm text-gray-500'>{description}</p>
            <p className='text-sm text-gray-400'>
              {formatRelativeTime(new Date(created_at))}
            </p>
            <span
              className={clsx(
                'absolute right-4 top-6 h-2 w-2 rounded-full transition-colors',
                viewed ? 'bg-primary-alert-success' : 'bg-primary-alert-error'
              )}
            />
          </div>
        </div>
      )}
    </Menu.Item>
  );
}
