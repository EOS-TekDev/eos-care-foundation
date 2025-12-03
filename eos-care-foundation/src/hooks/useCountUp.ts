import { useEffect, useRef, useState } from 'react';

interface UseCountUpOptions {
  start?: number;
  end: number;
  duration?: number;
  delay?: number;
  enabled?: boolean;
}

export function useCountUp({
  start = 0,
  end,
  duration = 2000,
  delay = 0,
  enabled = true,
}: UseCountUpOptions) {
  const [count, setCount] = useState(() => (enabled ? start : start));
  const prevEnabledRef = useRef(enabled);

  useEffect(() => {
    // Reset count when disabled changes from true to false
    if (!enabled && prevEnabledRef.current) {
      // Use RAF to avoid synchronous setState in effect
      const rafId = requestAnimationFrame(() => setCount(start));
      prevEnabledRef.current = enabled;
      return () => cancelAnimationFrame(rafId);
    }
    prevEnabledRef.current = enabled;

    if (!enabled) return;

    let startTimestamp: number | null = null;
    let animationFrame: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;

      if (elapsed < delay) {
        animationFrame = requestAnimationFrame(step);
        return;
      }

      const progress = Math.min((elapsed - delay) / duration, 1);
      // Ease out cubic for satisfying deceleration
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(start + (end - start) * easeOut);

      setCount(current);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      }
    };

    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, [start, end, duration, delay, enabled]);

  return count;
}
