import type { SyntheticEvent } from 'react';

type PreventBubblingProps = {
  preventDefault?: boolean;
  callback?: (...args: never[]) => unknown;
};

/**
 * Prevents the event from bubbling up the DOM tree.
 */
export function preventBubbling({
  preventDefault,
  callback
}: PreventBubblingProps = {}) {
  return (e: SyntheticEvent): void => {
    e.stopPropagation();

    if (preventDefault) e.preventDefault();
    if (callback) callback();
  };
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
