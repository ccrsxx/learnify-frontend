'use client';

import { useState } from 'react';
import { Otp } from './otp';
import { RegisterForm } from './register-form';

type RegisterTab = 'form' | 'otp';

export default function Register(): JSX.Element {
  const [tab, setCurrentNewTab] = useState<RegisterTab>('form');
  const [email, setEmail] = useState<string | null>(null);

  const handleChangeTab = (newTab: RegisterTab, email?: string): void => {
    if (email) setEmail(email);
    setCurrentNewTab(newTab);
  };

  return (
    <div className='mx-auto w-full max-w-lg'>
      {tab === 'form' ? (
        <RegisterForm onTabChange={handleChangeTab} />
      ) : (
        <Otp email={email!} onTabChange={handleChangeTab} />
      )}
    </div>
  );
}
