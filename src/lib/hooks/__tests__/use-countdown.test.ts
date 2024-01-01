import { act, renderHook } from '@testing-library/react';
import { useCountdown } from '../use-countdown';

describe('useCountdown', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  it('should countdown correctly', () => {
    const { result } = renderHook(() => useCountdown(5));

    expect(result.current.seconds).toBe(5);

    act(() => jest.advanceTimersByTime(1000));

    expect(result.current.seconds).toBe(4);
  });

  it('should reset countdown correctly', () => {
    const { result } = renderHook(() => useCountdown(5));

    act(() => jest.advanceTimersByTime(2000));

    expect(result.current.seconds).toBe(4);

    act(() => result.current.reset());

    expect(result.current.seconds).toBe(5);
  });
});
