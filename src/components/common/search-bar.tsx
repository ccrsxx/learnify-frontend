import { MdSearch } from 'react-icons/md';

export function SearchBar(): JSX.Element {
  return (
    <div className='grid w-full max-w-md'>
      <label
        className='smooth-tab flex items-center justify-between gap-4 rounded-2xl
                   bg-white px-6 py-3 ring transition focus-within:ring-primary-blue-300'
      >
        <input
          type='text'
          className='w-full bg-transparent focus-visible:outline-none'
          placeholder='Cari kursus terbaik...'
        />
        <button className='clickable cursor-pointer rounded-xl bg-primary-blue-500 p-2 transition hover:brightness-75'>
          <MdSearch className='text-xl text-white' />
        </button>
      </label>
    </div>
  );
}
