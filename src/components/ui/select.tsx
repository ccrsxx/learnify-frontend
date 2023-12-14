import { AnimatePresence, motion } from 'framer-motion';
import { clsx } from 'clsx';
import { Listbox } from '@headlessui/react';
import { MdCheck, MdKeyboardArrowDown } from 'react-icons/md';
import { Alert } from './alert';
import type { MotionProps } from 'framer-motion';
import type { FieldError } from 'react-hook-form';

type SelectProps = {
  label: string;
  value: undefined | string;
  error: FieldError | undefined;
  options: { id: string; name: string }[] | undefined;
  onChange?: (...event: unknown[]) => void;
};

export function Select({
  error,
  label,
  value,
  options,
  onChange
}: SelectProps): JSX.Element {
  const valueLabel = options?.find((option) => option.id === value)?.name;

  return (
    <Listbox onChange={onChange}>
      {({ open }): JSX.Element => (
        <div className='relative w-full'>
          <div className='grid gap-2'>
            <Listbox.Label>{label}</Listbox.Label>
            <Listbox.Button
              className={clsx('custom-input relative w-full', {
                'shadow-low': open,
                'border-primary-alert-error focus:border-primary-alert-error':
                  error
              })}
            >
              <span className='flex items-center gap-2 truncate capitalize'>
                {valueLabel ?? `Pilih ${label.toLowerCase()}`}
              </span>
              <i className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                <MdKeyboardArrowDown
                  className={clsx(
                    'h-5 w-5 rotate-0 text-gray-400 transition-transform',
                    open && '!rotate-180'
                  )}
                />
              </i>
            </Listbox.Button>
            {error && (
              <Alert variant='error' message={error?.message as string} />
            )}
          </div>
          <AnimatePresence mode='wait'>
            {open && (
              <Listbox.Options
                as={motion.ul}
                className='smooth-tab absolute z-10 mt-2 max-h-60 w-full overflow-auto rounded-md
                           bg-white text-sm shadow-high'
                {...variants}
                static
              >
                {options?.map(({ id, name }) => (
                  <Listbox.Option
                    className={({ active }): string =>
                      clsx(
                        `relative cursor-pointer select-none py-2 pl-10 pr-4 capitalize
                         transition-colors hover:bg-blue-300/10`,
                        active && 'bg-blue-300/10'
                      )
                    }
                    value={id}
                    key={id}
                  >
                    {({ selected }): JSX.Element => (
                      <>
                        <span
                          className={clsx(
                            'block truncate',
                            selected ? 'font-medium' : 'font-normal'
                          )}
                        >
                          {name}
                        </span>
                        {selected && (
                          <i
                            className='absolute inset-y-0 left-0 flex items-center pl-3
                                       text-blue-500'
                          >
                            <MdCheck className='h-5 w-5' />
                          </i>
                        )}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            )}
          </AnimatePresence>
        </div>
      )}
    </Listbox>
  );
}

const variants: MotionProps = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', duration: 0.4 }
  },
  exit: { opacity: 0, y: 20, transition: { duration: 0.2 } }
};
