import { clsx } from 'clsx';
import { FaBrain } from 'react-icons/fa';

type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps): JSX.Element {
  return (
    <div className={clsx('flex items-center gap-4 text-4xl', className)}>
      <FaBrain />
      <h1>Belajar</h1>
    </div>
  );
}
