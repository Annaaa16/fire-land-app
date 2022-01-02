// types
import { MutableRefObject } from 'react';

import useEventListener from './useEventListener';

const useClickOutside = (
  ref: MutableRefObject<Element | null>,
  handler: Function
) => {
  const listener = (e: Event) => {
    if (!ref.current || ref.current.contains(e.target as Node)) return;

    handler(e);
  };

  useEventListener('mousedown', listener);
  useEventListener('touchstart', listener);
};

export default useClickOutside;
