import { useEffect, useRef } from 'react';

// types
import { RefObject } from 'react';

const useEventListener = <T extends HTMLElement = HTMLDivElement>(
  eventName: keyof WindowEventMap,
  handler: Function,
  element?: RefObject<T>
) => {
  const savedHandler: any = useRef(null);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const targetElement: T | Window = element?.current || window;

    if (!(targetElement && targetElement.addEventListener)) return;

    const eventListener = (e: Event) => savedHandler.current(e);

    targetElement.addEventListener(eventName, eventListener);

    return () => targetElement.removeEventListener(eventName, eventListener);
  }, [eventName, element]);
};

export default useEventListener;
