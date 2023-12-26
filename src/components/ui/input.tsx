import { clsx } from 'clsx';
import { Alert } from './alert';
import type { PropsWithChildren, ReactNode } from 'react';
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form';

export type InputProps = PropsWithChildren<{
  id: string;
  type: 'text' | 'email' | 'textarea' | 'number' | 'tel' | 'password';
  label?: string;
  error?: FieldError | undefined;
  disabled?: boolean;
  required?: boolean;
  register?: UseFormRegisterReturn;
  tabIndex?: number;
  placeholder: string;
  overrideError?: boolean;
  additionalLabel?: ReactNode;
}>;

export function Input({
  id,
  type,
  label,
  error,
  disabled,
  tabIndex,
  children,
  register,
  required,
  placeholder,
  overrideError,
  additionalLabel
}: InputProps): JSX.Element {
  const inputErrorStyle =
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    (overrideError || error) &&
    'border-primary-alert-error focus:border-primary-alert-error';

  return (
    <div className='grid gap-2 text-black'>
      <div className='flex justify-between gap-4'>
        <label htmlFor={id}>{label}</label>
        {additionalLabel}
      </div>
      <div className='flex items-center gap-4 [&>:first-child]:flex-1'>
        {type === 'textarea' ? (
          <textarea
            className={clsx('custom-input', inputErrorStyle)}
            id={id}
            rows={4}
            tabIndex={tabIndex}
            required={required}
            disabled={disabled}
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
            disabled={disabled}
            placeholder={placeholder}
            {...register}
          />
        )}
        {children}
      </div>
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
