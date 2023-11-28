import { Logo } from './logo';

export function Placeholder(): JSX.Element {
  return (
    <main className='flex min-h-screen items-center justify-center bg-primary-blue-500'>
      <Logo className='text-6xl' />
    </main>
  );
}
