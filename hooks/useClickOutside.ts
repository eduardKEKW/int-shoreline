import { RefObject, useEffect } from 'react';

export const useOnClickOutside = <T extends HTMLElement>({
  ref,
  handler,
}: {
  ref: RefObject<T>;
  handler: (event: Event) => void;
}): void => {
  useEffect(() => {
    const listener = (event: Event) => {
      if (ref && (!ref.current || ref.current.contains(event.target as Node))) {
        return;
      }

      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};
