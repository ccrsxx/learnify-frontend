'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MdArrowBack } from 'react-icons/md';

type BackButtonProps = {
  href?: string;
  label: string;
  onClick?: () => void;
};

export function BackButton({
  href = '',
  label,
  onClick
}: BackButtonProps): JSX.Element {
  const router = useRouter();

  const Tag = href ? Link : 'button';

  return (
    <Tag
      className='smooth-tab mr-auto flex w-fit items-center gap-4 rounded-medium px-3 py-1
                 text-lg font-semibold text-black transition hover:bg-gray-200'
      href={href}
      {...(!href && { onClick: () => (onClick ? onClick() : router.back()) })}
    >
      <MdArrowBack className='text-lg' />
      {label}
    </Tag>
  );
}
