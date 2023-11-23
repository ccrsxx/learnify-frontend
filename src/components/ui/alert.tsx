import { MdCheckCircle, MdError } from 'react-icons/md';

type AlertProps = {
  variant: 'error' | 'success';
  message: string;
};

export function Alert({ variant, message }: AlertProps): JSX.Element {
  return (
    <div className='flex gap-2'>
      {variant === 'error' ? (
        <MdError className='text-lg text-red-400' />
      ) : (
        <MdCheckCircle className='text-lg text-green-400' />
      )}
      <p className='text-sm'>{message}</p>
    </div>
  );
}
