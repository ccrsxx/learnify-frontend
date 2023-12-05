import Link from 'next/link';
import { clsx } from 'clsx';
import { FaBrain } from 'react-icons/fa';

type LogoProps = {
  className?: string;
  clickable?: boolean;
};

export function Logo({ clickable, className }: LogoProps): JSX.Element {
  return (
    <Link
      href='/'
      className={clsx(
        'flex items-center gap-4 text-4xl',
        clickable ? 'pointer-events-auto' : 'pointer-events-none',
        className
      )}
      tabIndex={-1}
    >
      <FaBrain />
      Learnify
    </Link>
  );
}
