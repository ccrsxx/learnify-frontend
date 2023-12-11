import { clsx } from 'clsx';
import { Alert } from './alert';
import type { PropsWithChildren } from 'react';
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form';

export type InputProps = PropsWithChildren<{
  id: string;
  type: 'text' | 'textarea' | 'number' | 'tel' | 'password';
  label: string;
  error?: FieldError | undefined;
  required?: boolean;
  register?: UseFormRegisterReturn;
  tabIndex?: number;
  placeholder: string;
  overrideError?: boolean;
}>;

export function Input({
  id,
  type,
  label,
  error,
  tabIndex,
  children,
  register,
  required,
  placeholder,
  overrideError
}: InputProps): JSX.Element {
  const inputErrorStyle =
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    (overrideError || error) &&
    'border-primary-alert-error focus:border-primary-alert-error';

  return (
    <div className='grid gap-2'>
      <div className='flex justify-between'>
        <label htmlFor={id}>{label}</label>
        {children}
      </div>
      {type === 'textarea' ? (
        <textarea
          className={clsx('custom-input', inputErrorStyle)}
          id={id}
          rows={4}
          tabIndex={tabIndex}
          required={required}
          placeholder={placeholder}
          {...register}
        />
      ) : (
        <input
          className={clsx('custom-input', inputErrorStyle)}
          id={id}
          type={type}
          tabIndex={tabIndex}
          required={required}
          placeholder={placeholder}
          {...register}
        />
      )}
      {error && (
        <Alert
          className='mt-1'
          variant='error'
          message={error?.message as string}
        />
      )}
    </div>
  );
}
