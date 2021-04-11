import {
  useState, useCallback, useMemo, RefObject,
} from 'react';

import isSSR from '../utils/isSSR';
import getRefElement from '../utils/getRefElement';
import useEventListener from './useEventListener';

interface Scroll {
  y?: number;
  x?: number;
  direction?: 'up' | 'right' | 'down' | 'left';
}

interface UseScroll {
  element?: RefObject<Element> | Window | null;
}

export const useScroll = (options?: UseScroll): Scroll => {
  const { element } = useMemo<UseScroll>(
    () => ({
      element: isSSR ? undefined : window,
      ...options,
    }),
    [options],
  );

  const getScrollOffset = useCallback(
    (direction: 'y' | 'x') => {
      const target = getRefElement(element);

      if (isSSR || !target) {
        return undefined;
      }

      if ('window' in target) {
        return direction === 'y' ? target.pageYOffset : target.pageXOffset;
      }

      if ('nodeType' in target) {
        return direction === 'y' ? target.scrollTop : target.scrollLeft;
      }
    },
    [element],
  );

  const [scroll, setScroll] = useState<Scroll>({
    y: getScrollOffset('y'),
    x: getScrollOffset('x'),
    direction: undefined,
  });

  const setDirection = useCallback(
    ({ y, x }: Scroll) => {
      const yOffset = getScrollOffset('y');
      const xOffset = getScrollOffset('x');

      if (
        y !== undefined
        && x !== undefined
        && yOffset !== undefined
        && xOffset !== undefined
      ) {
        if (y > yOffset) return 'up';
        if (y < yOffset) return 'down';
        if (x > xOffset) return 'left';
        if (x < xOffset) return 'right';
      }
    },
    [getScrollOffset],
  );

  const scrollFunc = useCallback(() => {
    const yOffset = getScrollOffset('y');
    const xOffset = getScrollOffset('x');

    setScroll(prev => ({
      y: yOffset,
      x: xOffset,
      direction: setDirection(prev),
    }));
  }, [getScrollOffset, setDirection]);

  const handleScroll = useMemo(
    () => () => scrollFunc(),
    [scrollFunc],
  );

  useEventListener({
    type: 'scroll',
    listener: handleScroll,
    element,
    options: { passive: true },
  });

  return scroll;
};
