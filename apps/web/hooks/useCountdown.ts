import { useEffect, useEffectEvent, useRef, useState } from "react";

const INTERVAL_IN_MILLISECONDS = 100;

export function useCountdown(
  onComplete?: () => void,
): [number | null, (duration: number) => void] {
  const [duration, setDuration] = useState<number | null>(null);
  const [time, setTime] = useState<number | null>(null);
  const referenceTime = useRef<number | null>(null);

  const handleComplete = useEffectEvent(() => onComplete?.());

  useEffect(() => {
    if (duration === null) {
      return;
    }

    referenceTime.current = Date.now();

    const intervalId = setInterval(() => {
      const elapsed = Date.now() - referenceTime.current!;
      const timeLeft = Math.max(duration * 1000 - elapsed, 0);

      setTime(timeLeft);
      if (timeLeft === 0) {
        clearInterval(intervalId);
        handleComplete();
      }
    }, INTERVAL_IN_MILLISECONDS);

    return () => clearInterval(intervalId);
  }, [duration]);

  return [
    time !== null ? Math.floor(time / 1000) : null,
    (duration: number) => setDuration(duration),
  ];
}
