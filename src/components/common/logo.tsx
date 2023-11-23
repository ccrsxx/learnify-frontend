import { FaBrain } from 'react-icons/fa';

export function Logo(): JSX.Element {
  return (
    <div className='flex items-center gap-4 text-white'>
      <FaBrain className='text-4xl' />
      <h1 className='text-4xl'>Belajar</h1>
    </div>
  );
}
