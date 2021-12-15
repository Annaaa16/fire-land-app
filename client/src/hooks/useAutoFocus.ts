import { useEffect } from 'react';

// react
import { RefObject } from 'react';

const useAutoFocus = (
  ref: RefObject<HTMLInputElement | HTMLTextAreaElement | null>,
  deps?: any
) => {
  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    element.focus();
    element.setSelectionRange(element.value.length, element.value.length);
  }, [ref, deps]);
};

export default useAutoFocus;
