import { clsx } from 'clsx';
import { MdCheckCircle, MdError } from 'react-icons/md';

type AlertProps = {
  variant: 'error' | 'success';
  message: string;
  className?: string;
};

export function Alert({
  variant,
  message,
  className
}: AlertProps): JSX.Element {
  return (
    <div className={clsx('flex gap-2', className)}>
      {variant === 'error' ? (
        <MdError className='text-lg text-primary-alert-error' />
      ) : (
        <MdCheckCircle className='text-lg text-primary-alert-success' />
      )}
      <p className='text-sm'>{message}</p>
    </div>
  );
}
