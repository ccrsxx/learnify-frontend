import { clsx } from 'clsx';
import { MdSearch } from 'react-icons/md';
import type { ChangeEvent } from 'react';

type SearchBarProps = {
  value?: string;
  small?: boolean;
  placeholder?: string;
  onChange?: ({ target: { value } }: ChangeEvent<HTMLInputElement>) => void;
};

export function SearchBar({
  value,
  small,
  placeholder,
  onChange
}: SearchBarProps): JSX.Element {
  return (
    <label
      className={clsx(
        `flex w-full items-center justify-between gap-4 rounded-2xl bg-white
         ring-1 ring-primary-blue-500 transition focus-within:ring-2 focus-within:ring-primary-blue-300`,
        small ? 'max-w-xs px-3 py-1.5' : 'max-w-md px-6 py-3'
      )}
    >
      <input
        type='text'
        className='w-full bg-transparent text-black focus-visible:outline-none'
        placeholder={placeholder ?? 'Cari kursus terbaik...'}
        value={value}
        onChange={onChange}
      />
      <button
        className='clickable cursor-pointer rounded-xl bg-primary-blue-500 p-2 
                   transition hover:brightness-90'
      >
        <MdSearch
          className={clsx('text-white', small ? 'text-base' : 'text-xl')}
        />
      </button>
    </label>
  );
}
