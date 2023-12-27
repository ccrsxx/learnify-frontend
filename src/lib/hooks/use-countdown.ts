import { useState, useEffect } from 'react';

type Countdown = {
  seconds: number;
  reset: () => void;
};

export function useCountdown(initialSeconds: number): Countdown {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (!seconds) return;

    const intervalId = setInterval(() => setSeconds(seconds - 1), 1000);

    return () => clearInterval(intervalId);
  }, [seconds]);

  const reset = (): void => setSeconds(initialSeconds);

  return { seconds, reset };
}
