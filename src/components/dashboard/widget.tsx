import { clsx } from 'clsx';
import { MdGroup } from 'react-icons/md';
import { formatNumber } from '@/lib/format';

export type WidgetProps = {
  id: string;
  label: string;
  color: string;
  value: number;
};

export function Widget({ label, color, value }: WidgetProps): JSX.Element {
  return (
    <article
      className={clsx('flex items-center gap-4 rounded-medium p-6', color)}
    >
      <div className='rounded-full bg-white p-3'>
        <MdGroup className='text-3xl text-primary-blue-500' />
      </div>
      <div>
        <p className='text-2xl font-semibold'>{formatNumber(value)}</p>
        <p className='text-base'>{label}</p>
      </div>
    </article>
  );
}
