import { RefObject, useCallback, useLayoutEffect } from 'react';
import useResizeObserver from 'use-resize-observer';

interface Size {
  width: number;
  height: number;
}

interface UseResizeComponentProps<T> {
  ref: RefObject<T>;
  callback: (size: Size) => void;
}

export const useResizeComponent = <T extends HTMLElement = HTMLElement>({
  ref,
  callback,
}: UseResizeComponentProps<T>): void => {
  const handleSize = useCallback(() => {
    callback?.({
      width: ref?.current?.offsetWidth || 0,
      height: ref?.current?.offsetHeight || 0,
    });
  }, [ref, callback]);

  useLayoutEffect(() => {
    handleSize();
    ref?.current?.addEventListener('resize', handleSize);
    return () => {
      if (ref?.current) ref.current.removeEventListener('resize', handleSize);
    };
  }, [ref]);

  useResizeObserver<T>({
    ref,
    onResize: ({ width = 0, height = 0 }) => {
      callback?.({
        width,
        height,
      });
    },
  });
};
