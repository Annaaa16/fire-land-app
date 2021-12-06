import { useEffect, useState } from 'react';

// types
import { RefObject } from 'react';

const useIntersectionObserver = (
  ref: RefObject<HTMLElement | null>,
  rootMargin = '0px'
) => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        rootMargin,
      }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref, rootMargin]);

  return isIntersecting;
};

export default useIntersectionObserver;
