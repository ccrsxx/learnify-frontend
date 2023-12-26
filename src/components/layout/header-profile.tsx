import { clsx } from 'clsx';
import { Menu } from '@headlessui/react';
import { MdNotifications } from 'react-icons/md';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuth } from '@/lib/context/auth-context';
import { LazyImage } from '../ui/lazy-image';
import type { MotionProps } from 'framer-motion';
import type { IconType } from 'react-icons';
import type { ReactNode } from 'react';

export function HeaderProfile(): JSX.Element {
  const { user, logout } = useAuth();

  const { name, image, admin, email } = user!;

  return (
    <div className='flex items-center gap-3'>
      <Link
        className='relative rounded-full p-2 text-white'
        href='/notifications'
      >
        <span className='absolute right-0 flex h-3 w-3'>
          <span
            className='absolute inline-flex h-full w-full animate-ping 
                       rounded-full bg-sky-400 opacity-75'
          />
          <span className='relative inline-flex h-3 w-3 rounded-full bg-sky-500' />
        </span>
        <MdNotifications className='text-4xl' />
      </Link>
      <Menu className='relative' as='div'>
        {({ open }) => (
          <>
            <Menu.Button className='smooth-tab relative grid place-items-center'>
              <LazyImage
                className='h-10 w-10 rounded-full object-cover'
                width={40}
                height={40}
                src={image ?? `https://vercel.com/api/www/avatar?u=${name}`}
                alt={name}
              />
            </Menu.Button>
            <AnimatePresence mode='wait'>
              {open && (
                <Menu.Items
                  className='smooth-tab absolute right-0 z-20 mt-4 w-48 origin-top-right
                             rounded-md bg-white py-1 shadow-high'
                  static
                  as={motion.div}
                  {...variants}
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

const variants: MotionProps = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', duration: 0.4 }
  },
  exit: { opacity: 0, y: 20, transition: { duration: 0.2 } }
};
