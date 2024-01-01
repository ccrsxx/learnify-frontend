import { Login } from './login';
import type { Metadata } from 'next';

export default function LoginUser(): JSX.Element {
  return <Login />;
}

export const metadata: Metadata = {
  title: 'Masuk | Learnify'
};
