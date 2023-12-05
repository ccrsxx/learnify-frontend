import Link from 'next/link';
import { MdArrowBack } from 'react-icons/md';

type BackButtonProps = {
  href: string;
  label: string;
};

export function BackButton({ href, label }: BackButtonProps): JSX.Element {
  return (
    <Link
      className='mr-auto flex items-center gap-4 rounded-md px-3 py-1 text-lg
                 font-semibold transition-colors hover:bg-gray-200'
      href={href}
    >
      <MdArrowBack className='text-lg' />
      {label}
    </Link>
  );
}
