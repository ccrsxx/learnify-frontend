import { clsx } from 'clsx';
import { Switch } from '@headlessui/react';
import { MdCheck } from 'react-icons/md';

type CheckboxProps = {
  label: string;
  checked: boolean;
  onClick: () => void;
};

export function Checkbox({
  label,
  checked,
  onClick
}: CheckboxProps): JSX.Element {
  return (
    <Switch.Group className='flex items-center gap-2' as='div'>
      <Switch
        className={clsx(
          'smooth-tab h-5 w-5 rounded-low border',
          checked ? 'bg-primary-blue-500' : 'bg-primary-blue-50'
        )}
        onClick={onClick}
      >
        <MdCheck
          className={clsx(
            'text-white transition-opacity',
            checked ? 'opacity-100' : 'opacity-0'
          )}
        />
      </Switch>
      <Switch.Label className='font-medium text-primary-blue-600'>
        {label}
      </Switch.Label>
    </Switch.Group>
  );
}
