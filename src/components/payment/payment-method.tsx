import { Accordion } from '../ui/accordion';
import { Input } from '../ui/input';
import type { Dispatch, SetStateAction, RefObject } from 'react';

type PaymentMethodProps = {
  formRef: RefObject<HTMLFormElement>;
  creditCardOpen: boolean;
  transferBankOpen: boolean;
  onCreditCardOpen: Dispatch<SetStateAction<boolean>>;
  onTransferBankOpen: Dispatch<SetStateAction<boolean>>;
};

export function PaymentMethod({
  formRef,
  creditCardOpen,
  transferBankOpen,
  onCreditCardOpen,
  onTransferBankOpen
}: PaymentMethodProps): JSX.Element {
  const toggleAccordion = (type: 'bank' | 'credit') => (): void => {
    if (type === 'bank' && transferBankOpen) {
      onTransferBankOpen(false);
      return;
    }

    if (type === 'credit' && creditCardOpen) {
      onCreditCardOpen(false);
      return;
    }

    const isOneOpen = transferBankOpen || creditCardOpen;

    if (!isOneOpen) {
      if (type === 'bank') onTransferBankOpen(true);
      else onCreditCardOpen(true);
      return;
    }

    if (transferBankOpen) {
      onTransferBankOpen(false);
      onCreditCardOpen(true);
    } else {
      onTransferBankOpen(true);
      onCreditCardOpen(false);
    }
  };

  return (
    <>
      <Accordion
        label='Bank Transfer'
        open={transferBankOpen}
        customToggle={toggleAccordion('bank')}
      >
        Bayar dengan bank transfer. Kami menerima transfer dari semua bank.
        Pembayaran akan diverifikasi dalam waktu 1x24 jam.
      </Accordion>
      <Accordion
        label='Credit Card'
        open={creditCardOpen}
        customToggle={toggleAccordion('credit')}
      >
        <form className='grid gap-3' ref={formRef}>
          <Input
            required
            id='card-number'
            type='number'
            label='Card number'
            placeholder='4480 0000 0000 000'
          />
          <Input
            required
            id='card-name'
            type='text'
            label='Card name'
            placeholder='John Doe'
          />
          <div className='grid grid-cols-2 gap-3'>
            <Input
              required
              id='card-cvv'
              type='number'
              label='CVV'
              placeholder='000'
            />
            <Input
              required
              id='card-expiry'
              type='number'
              label='Expiry Date'
              placeholder='07/24'
            />
          </div>
        </form>
      </Accordion>
    </>
  );
}
