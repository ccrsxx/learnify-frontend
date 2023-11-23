'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/context/auth-context';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert } from '@/components/ui/alert';
import type { ChangeEvent, FormEvent } from 'react';
import type { InputProps } from '@/components/ui/input';

type LoginForm = {
  email: string;
  password: string;
};

const initialLoginForm: LoginForm = {
  email: 'emilia@rezero.com',
  password: 'emilia'
};

export default function Login(): JSX.Element {
  const [loginForm, setLoginForm] = useState<LoginForm>(initialLoginForm);

  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { login } = useAuth();

  const handleChange = ({
    target: { id, value }
  }: ChangeEvent<HTMLInputElement>): void =>
    setLoginForm((prev) => ({ ...prev, [id]: value }));

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    setSubmitted(false);
    setErrorMessage('');

    const { email, password } = loginForm;

    const message = await login(email, password);

    if (message) setErrorMessage(message);

    setSubmitted(true);
  };

  const inputs: InputProps[] = [
    {
      id: 'email',
      type: 'text',
      label: 'Email',
      value: loginForm.email,
      required: false,
      errorMessage: '',
      handleChange: handleChange
    },
    {
      id: 'password',
      type: 'text',
      label: 'Password',
      value: loginForm.password,
      required: false,
      errorMessage: '',
      handleChange: handleChange
    }
  ];

  return (
    <main className='layout mt-4 grid max-w-md gap-4'>
      <h1>Login</h1>
      <section>
        <form className='grid gap-4' onSubmit={handleSubmit}>
          {inputs.map((input) => (
            <Input {...input} key={input.id} />
          ))}
          <Button type='submit'>Login</Button>
        </form>
      </section>
      {submitted && (
        <Alert
          variant={errorMessage ? 'error' : 'success'}
          message={errorMessage ? errorMessage : 'Login successful'}
        />
      )}
    </main>
  );
}
