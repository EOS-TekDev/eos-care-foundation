import { useCallback, useRef, useState, type RefCallback } from 'react';

interface UseScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

interface UseScrollRevealReturn<T extends HTMLElement> {
  setRef: RefCallback<T>;
  isVisible: boolean;
}

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollRevealOptions = {}
): UseScrollRevealReturn<T> {
  const { threshold = 0.1, rootMargin = '0px', triggerOnce = true } = options;
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const elementRef = useRef<T | null>(null);

  const ref = useCallback(
    (node: T | null) => {
      // Cleanup previous observer
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }

      if (!node) {
        elementRef.current = null;
        return;
      }

      elementRef.current = node;

      // Guard for non-browser environments
      if (typeof window === 'undefined') return;

      // Check if already visible on mount
      const rect = node.getBoundingClientRect();
      const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
      if (isInViewport) {
        setIsVisible(true);
        if (triggerOnce) return;
      }

      // Set up intersection observer
      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (triggerOnce && observerRef.current) {
              observerRef.current.disconnect();
            }
          } else if (!triggerOnce) {
            setIsVisible(false);
          }
        },
        { threshold, rootMargin }
      );

      observerRef.current.observe(node);
    },
    [threshold, rootMargin, triggerOnce]
  );

  return { setRef: ref, isVisible };
}
