import { clsx } from 'clsx';
import { MdSearch } from 'react-icons/md';
import type { Dispatch, SetStateAction } from 'react';

type SearchBarProps = {
  value: string;
  small?: boolean;
  className?: string;
  placeholder?: string;
  onSearchChange: Dispatch<SetStateAction<string>>;
};

export function SearchBar({
  value,
  small,
  className,
  placeholder,
  onSearchChange
}: SearchBarProps): JSX.Element {
  return (
    <label
      className={clsx(
        `flex w-full items-center justify-between gap-4 rounded-high bg-white
         ring-1 ring-primary-blue-500 transition focus-within:ring-2
         focus-within:ring-primary-blue-300`,
        small ? 'px-4 py-1.5 lg:max-w-xs' : 'px-6 py-3 md:max-w-md',
        className
      )}
    >
      <input
        type='text'
        className='w-full bg-transparent text-black focus-visible:outline-none'
        placeholder={placeholder ?? 'Cari kursus terbaik...'}
        value={value}
        onChange={({ target: { value } }) => onSearchChange(value)}
      />
      <button
        className='clickable cursor-pointer rounded-medium bg-primary-blue-500 p-2 
                   transition hover:brightness-90'
      >
        <MdSearch
          className={clsx('text-white', small ? 'text-base' : 'text-xl')}
        />
      </button>
    </label>
  );
}
