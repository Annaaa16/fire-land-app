import { useEffect, useState } from 'react';

// types
import { MutableRefObject } from 'react';

const useMeeting = (
  ref: MutableRefObject<HTMLElement | null>,
  rootMargin = '0px'
) => {
  const [isMeeting, setIsMeeting] = useState(false);

  useEffect(() => {
    const options = {
      rootMargin,
    };

    const observer = new IntersectionObserver(([entry]) => {
      setIsMeeting(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [ref, rootMargin]);

  return isMeeting;
};

export default useMeeting;
