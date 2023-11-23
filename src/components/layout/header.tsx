import { MdLogin } from 'react-icons/md';
import { Logo } from '../common/logo';
import { SearchBar } from '../common/search-bar';

export function Header(): JSX.Element {
  return (
    <header className='flex justify-center bg-primary-blue-500'>
      <div className='flex w-full max-w-6xl gap-8 p-4'>
        <Logo />
        <SearchBar />
        <button className='clickable smooth-tab ml-auto flex items-center gap-2 text-xl text-white'>
          <MdLogin />
          Masuk
        </button>
      </div>
    </header>
  );
}
