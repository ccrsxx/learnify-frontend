'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert } from '@/components/ui/alert';
import type { ChangeEvent, FormEvent } from 'react';
import type { InputProps } from '@/components/ui/input';

type RegisterForm = {
  name: string;
  email: string;
  username: string;
  password: string;
};

const initialRegisterForm: RegisterForm = {
  name: '',
  email: '',
  username: '',
  password: ''
};

export default function Login(): JSX.Element {
  const [registerForm, setRegisterForm] =
    useState<RegisterForm>(initialRegisterForm);

  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = ({
    target: { id, value }
  }: ChangeEvent<HTMLInputElement>): void =>
    setRegisterForm((prev) => ({ ...prev, [id]: value }));

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    setSubmitted(false);
    setErrorMessage('');

    const parsedRegisterForm = {
      ...registerForm,
      image: 'https://static.productionready.io/images/smiley-cyrus.jpg'
    };

    try {
      const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsedRegisterForm)
      });

      const data = (await response.json()) as { message: string };

      if (!response.ok) throw new Error(data.message);

      setRegisterForm(initialRegisterForm);
    } catch (err) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
        return;
      }

      setErrorMessage('Internal Server Error');
    } finally {
      setSubmitted(true);
    }
  };

  const inputs: InputProps[] = [
    {
      id: 'name',
      type: 'text',
      label: 'Name',
      value: registerForm.name,
      required: false,
      errorMessage: '',
      handleChange: handleChange
    },
    {
      id: 'email',
      type: 'text',
      label: 'Email',
      value: registerForm.email,
      required: false,
      errorMessage: '',
      handleChange: handleChange
    },
    {
      id: 'username',
      type: 'text',
      label: 'Username',
      value: registerForm.username,
      required: false,
      errorMessage: '',
      handleChange: handleChange
    },
    {
      id: 'password',
      type: 'text',
      label: 'Password',
      value: registerForm.password,
      required: false,
      errorMessage: '',
      handleChange: handleChange
    }
  ];

  return (
    <main className='layout mt-4 grid max-w-md gap-4'>
      <h1>Register</h1>
      <section>
        <form className='grid gap-4' onSubmit={handleSubmit}>
          {inputs.map((input) => (
            <Input {...input} key={input.id} />
          ))}
          <Button type='submit'>Register</Button>
        </form>
      </section>
      {submitted && (
        <Alert
          variant={errorMessage ? 'error' : 'success'}
          message={errorMessage ? errorMessage : 'Registration successful'}
        />
      )}
    </main>
  );
}
