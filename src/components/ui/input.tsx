import { clsx } from 'clsx';
import type { ChangeEvent } from 'react';

export type InputProps = {
  id: string;
  type: 'text' | 'number';
  label: string;
  value: string | number;
  required?: boolean;
  errorMessage?: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export function Input({
  id,
  type,
  label,
  value,
  required,
  errorMessage,
  handleChange
}: InputProps): JSX.Element {
  return (
    <div className='grid gap-2'>
      <div
        className={clsx(
          'relative rounded ring-1 ring-gray-600 transition-shadow duration-200',
          errorMessage
            ? 'ring-red-400'
            : `ring-light-line-reply dark:ring-dark-border 
                 focus-within:ring-2 focus-within:!ring-gray-600`
        )}
      >
        <input
          className='peer mt-6 w-full bg-inherit px-3 pb-1
                     placeholder-transparent outline-none transition'
          id={id}
          name={id}
          type={type}
          value={value}
          required={required}
          placeholder={id}
          onChange={handleChange}
        />
        <label
          className={clsx(
            `group-peer bg-main-background text-light-secondary dark:text-dark-secondary absolute left-3
             translate-y-1 text-sm transition-all
             peer-placeholder-shown:translate-y-3 peer-placeholder-shown:text-lg peer-focus:translate-y-1
             peer-focus:text-sm`,
            errorMessage
              ? '!text-red-400 peer-focus:text-red-400'
              : 'peer-focus:text-accent-main'
          )}
          htmlFor={id}
        >
          {label}
        </label>
      </div>
      {errorMessage && <p className='text-sm text-red-400'>{errorMessage}</p>}
    </div>
  );
}
