import { MdLogin } from 'react-icons/md';
import { Logo } from '../common/logo';
import { SearchBar } from '../common/search-bar';
import { Button } from '../ui/button';

export function Header(): JSX.Element {
  return (
    <header className='flex justify-center bg-primary-blue-500'>
      <div className='layout flex w-full items-center gap-8 p-4'>
        <Logo />
        <SearchBar />
        <Button className='ml-auto flex items-center gap-2 text-xl font-bold'>
          <MdLogin />
          Masuk
        </Button>
      </div>
    </header>
  );
}
