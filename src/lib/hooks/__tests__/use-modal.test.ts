import { act, renderHook } from '@testing-library/react';
import { useModal } from '../use-modal';

describe('use-modal', () => {
  it('should be able to import use-modal', () => {
    expect(() => import('../use-modal')).not.toThrow();
  });

  it('should be able to open modal', () => {
    const { result } = renderHook(() => useModal());

    act(() => result.current.openModal());

    expect(result.current.open).toEqual(true);
  });

  it('should be able to open and close modal', () => {
    const { result } = renderHook(() => useModal());

    act(() => result.current.openModal());

    expect(result.current.open).toEqual(true);

    act(() => result.current.closeModal());

    expect(result.current.open).toEqual(false);
  });
});
