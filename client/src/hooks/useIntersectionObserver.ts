import { useEffect, useState } from 'react';

// types
import { MutableRefObject } from 'react';

const useIntersectionObserver = (
  ref: MutableRefObject<HTMLElement | null>,
  rootMargin = '0px'
) => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const options = {
      rootMargin,
    };

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [ref, rootMargin]);

  return isIntersecting;
};

export default useIntersectionObserver;
