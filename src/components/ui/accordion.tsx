import { clsx } from 'clsx';
import { Disclosure } from '@headlessui/react';
import { MdExpandLess } from 'react-icons/md';
import type { PropsWithChildren, Dispatch, SetStateAction } from 'react';

type AccordionProps = PropsWithChildren<{
  open: boolean;
  label: string;
  onToggle?: Dispatch<SetStateAction<boolean>>;
  customToggle?: () => void;
}>;

export function Accordion({
  open,
  label,
  children,
  onToggle,
  customToggle
}: AccordionProps): JSX.Element {
  return (
    <Disclosure as='div'>
      <Disclosure.Button
        className={clsx(
          `flex w-full justify-between rounded-medium bg-primary-blue-50 px-4 py-2 text-left 
           text-sm font-medium text-primary-blue-500 transition hover:brightness-90
           focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75`,
          open && 'bg-primary-blue-500 text-white'
        )}
        onClick={customToggle ? customToggle : (): void => onToggle?.(!open)}
      >
        {label}
        <MdExpandLess
          className={clsx('h-5 w-5 transition-transform', open && 'rotate-180')}
        />
      </Disclosure.Button>
      <div
        className={clsx(
          'grid grid-rows-[0fr] overflow-hidden transition-[grid-template-rows] duration-300',
          open && 'grid-rows-[1fr]'
        )}
      >
        <Disclosure.Panel
          className={clsx(
            'invisible min-h-0 text-sm transition-[visibility] duration-300',
            open && '!visible'
          )}
          static
        >
          <div className='px-2 pt-2'>{children}</div>
        </Disclosure.Panel>
      </div>
    </Disclosure>
  );
}
