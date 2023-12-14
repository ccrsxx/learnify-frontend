import { clsx } from 'clsx';
import type { PropsWithChildren } from 'react';

type CollapseProps = PropsWithChildren<{
  open: boolean;
  className?: string;
  wrapperClassName?: string;
}>;

export function Collapse({
  open,
  children,
  className,
  wrapperClassName
}: CollapseProps): JSX.Element {
  return (
    <div
      className={clsx(
        'grid grid-rows-[0fr] overflow-hidden transition-[grid-template-rows] duration-300',
        open && 'grid-rows-[1fr]',
        wrapperClassName
      )}
    >
      <div
        className={clsx(
          'invisible min-h-0 text-sm transition-[visibility] duration-300',
          open && '!visible',
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}
