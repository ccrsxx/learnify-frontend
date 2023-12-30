import { clsx } from 'clsx';
import { Menu } from '@headlessui/react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuth } from '@/lib/context/auth-context';
import { LazyImage } from '../ui/lazy-image';
import { Notification } from './notification';
import type { MotionProps } from 'framer-motion';
import type { IconType } from 'react-icons';
import type { ReactNode } from 'react';

export function HeaderProfile(): JSX.Element {
  const { user, logout } = useAuth();

  const { name, image, admin, email } = user!;

  return (
    <div className='flex items-center gap-3 md:gap-4'>
      <Notification />
      <Menu className='relative' as='div'>
        {({ open }) => (
          <>
            <Menu.Button className='smooth-tab relative grid place-items-center'>
              <LazyImage
                className='h-8 w-8 rounded-full object-cover shadow-low hover:shadow-high'
                width={32}
                height={32}
                src={image ?? `https://vercel.com/api/www/avatar?u=${name}`}
                alt={name}
              />
            </Menu.Button>
            <AnimatePresence mode='wait'>
              {open && (
                <Menu.Items
                  className='smooth-tab absolute right-0 z-20 mt-4 w-48 origin-top-right
                             rounded-medium bg-white py-1 shadow-high'
                  static
                  as={motion.div}
                  {...menuVariants}
                >
                  <div className='px-4 py-2'>
                    <p className='text-black'>{name}</p>
                    <p className='text-sm text-gray-500'>{email}</p>
                  </div>
                  <hr />
                  {admin && <NavItem name='Dashboard' href='/dashboard' />}
                  <NavItem name='My Courses' href='/my-courses' />
                  <NavItem name='Settings' href='/account' />
                  <NavItem name='Log Out' href='/' onClick={logout} />
                </Menu.Items>
              )}
            </AnimatePresence>
          </>
        )}
      </Menu>
    </div>
  );
}

type NavigationProps = {
  name: string;
  href: string;
  onlyAdmin?: boolean;
  Icon?: IconType;
  onClick?: () => void;
};

function NavItem({
  name,
  href,
  onlyAdmin,
  Icon,
  onClick
}: NavigationProps): ReactNode {
  const { user } = useAuth();

  if (onlyAdmin && !user?.admin) return null;

  return (
    <Menu.Item>
      {({ active }) => (
        <Link
          href={href}
          className={clsx(
            'flex px-4 py-2 text-sm text-gray-700 transition-colors',
            active && 'bg-gray-100'
          )}
          onClick={onClick}
        >
          {name}
          {Icon && <Icon className='ml-auto text-lg' />}
        </Link>
      )}
    </Menu.Item>
  );
}

export const menuVariants: MotionProps = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', duration: 0.4 }
  },
  exit: { opacity: 0, y: 20, transition: { duration: 0.2 } }
};
