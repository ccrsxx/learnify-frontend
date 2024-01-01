import { Login } from '../login';
import type { Metadata } from 'next';

export default function LoginAdmin(): JSX.Element {
  return <Login admin />;
}

export const metadata: Metadata = {
  title: 'Masuk Admin | Learnify'
};
