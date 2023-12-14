import type {
  HTMLAttributes,
  PropsWithChildren,
  ComponentPropsWithoutRef
} from 'react';

export type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

export type ValidTag = keyof JSX.IntrinsicElements;

export type CustomTag<T extends ValidTag> = PropsWithChildren<
  {
    tag?: T | ValidTag;
  } & (ComponentPropsWithoutRef<T> & HTMLAttributes<HTMLOrSVGElement>)
>;
