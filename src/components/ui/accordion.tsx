import { clsx } from 'clsx';
import { Disclosure } from '@headlessui/react';
import { MdExpandLess } from 'react-icons/md';
import { Collapse } from './collapse';
import type { PropsWithChildren, Dispatch, SetStateAction } from 'react';

type AccordionProps = PropsWithChildren<{
  open: boolean;
  label: string;
  className?: string;
  panelClassName?: string;
  collapseClassName?: string;
  collapseWrapperClassName?: string;
  onToggle?: Dispatch<SetStateAction<boolean>>;
  customToggle?: () => void;
}>;

export function Accordion({
  open,
  label,
  children,
  className,
  panelClassName,
  collapseClassName,
  collapseWrapperClassName,
  onToggle,
  customToggle
}: AccordionProps): JSX.Element {
  return (
    <Disclosure as='div'>
      <Disclosure.Button
        className={clsx(
          `flex w-full justify-between rounded-medium bg-primary-blue-50 px-4 py-2 text-left 
           font-medium text-primary-blue-500 transition hover:brightness-90
           focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75`,
          className,
          open && '!bg-primary-blue-500 text-white'
        )}
        onClick={customToggle ? customToggle : (): void => onToggle?.(!open)}
      >
        {label}
        <MdExpandLess
          className={clsx('h-5 w-5 transition-transform', open && 'rotate-180')}
        />
      </Disclosure.Button>
      <Collapse
        open={open}
        className={collapseClassName}
        wrapperClassName={collapseWrapperClassName}
      >
        <Disclosure.Panel
          className={clsx('pt-4', panelClassName)}
          as='div'
          static
        >
          {children}
        </Disclosure.Panel>
      </Collapse>
    </Disclosure>
  );
}
