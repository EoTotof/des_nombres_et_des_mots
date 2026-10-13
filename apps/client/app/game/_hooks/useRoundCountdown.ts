import { useCountdown } from "@/hooks/useCountdown";
import { useEffect, useRef } from "react";

export function useRoundCountdown(
  timestampGetter: () => number | null,
  onComplete: () => void,
  onRefresh: () => void,
) {
  const roundEndsAtRef = useRef<number | null>(null);
  const roundCountdown = useCountdown(onComplete);

  useEffect(() => {
    const timestamp = timestampGetter();

    const [, startTimer, resetTimer] = roundCountdown;

    if (roundEndsAtRef.current === timestamp) {
      return;
    }

    onRefresh();

    roundEndsAtRef.current = timestamp;

    if (timestamp) {
      const duration = Math.floor((timestamp - new Date().getTime()) / 1000);
      startTimer(duration);
    } else {
      resetTimer();
    }
  }, [timestampGetter, onRefresh, roundCountdown]);

  return roundCountdown;
}
