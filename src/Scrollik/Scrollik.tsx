import {
  FC, SyntheticEvent, useCallback, useEffect, useRef, useState,
} from 'react';
import classNames from 'classnames';

import { IScrollikProps, IVValues } from './types';
import useMutationObserver from '../hooks/useMutationObserver';
import useWindowResize from '../hooks/useWindowResize';
import useScroll from '../hooks/useScroll';

import './style.scss';

const Scrollik: FC<IScrollikProps> = ({
  className,
  vThumbClassName,
  vTrackClassName,
  vThumbOffset = 0,
  vThumbSize,
  overlay = false,
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const vTrackRef = useRef<HTMLDivElement>(null);
  const vThumbRef = useRef<HTMLDivElement>(null);
  const vValues = useRef<IVValues>({});

  const [vDeltaContent, setVDeltaContent] = useState(0);
  const [vDeltaThumb, setVDeltaThumb] = useState(0);
  const [vTrackH, setVTrackH] = useState(0);
  const [vThumbH, setVThumbH] = useState(0);
  const [vThumbTop, setVThumbTop] = useState(0);

  const scroll = useScroll({ element: containerRef });

  const calculateSizes = useCallback(() => {
    if (!vThumbRef.current || !vTrackRef.current || !containerRef.current || !contentRef.current) {
      return;
    }

    const containerHeight = containerRef.current.clientHeight;
    const contentHeight = contentRef.current.clientHeight;
    const vTrackHeight = containerHeight;
    const vThumbHeight = vThumbSize || (vTrackHeight * containerHeight / contentHeight);

    setVTrackH(vTrackHeight);
    setVThumbH(vThumbHeight);

    setVDeltaContent(contentHeight > containerHeight ? contentHeight - containerHeight : 0);
    setVDeltaThumb(vTrackHeight - vThumbHeight);
  }, []);

  useMutationObserver(() => {
    calculateSizes();
  }, containerRef);

  useWindowResize(() => {
    calculateSizes();
  }, []);

  useEffect(() => {
    calculateSizes();
  }, [vDeltaContent, vDeltaThumb]);

  useEffect(() => {
    if (vTrackRef.current) {
      vTrackRef.current.style.height = vTrackH + 'px';
    }
  }, [vTrackH]);

  useEffect(() => {
    if (vThumbRef.current) {
      vThumbRef.current.style.height = vThumbH - 2 * vThumbOffset + 'px';
    }
  }, [vThumbH]);

  useEffect(() => {
    if (vThumbRef.current) {
      vThumbRef.current.style.top = vThumbTop + vThumbOffset + 'px';
    }
  }, [vThumbTop]);

  useEffect(() => {
    if (vThumbRef.current && scroll && vDeltaThumb && vDeltaContent) {
      setVThumbTop((scroll.y || 0) * (vDeltaThumb / vDeltaContent));
    }
  }, [scroll, vDeltaThumb, vDeltaContent]);

  const handleVThumbMouseDown = useCallback((e: SyntheticEvent<HTMLDivElement, MouseEvent>) => {
    vValues.current = {
      isMouseDown: true,
      start: e.nativeEvent.clientY,
      end: vThumbTop,
    };
  }, [vThumbTop]);

  const turnOffScroll = useCallback(() => {
    vValues.current.isMouseDown = false;
  }, []);

  const scrollContent = useCallback((e: MouseEvent) => {
    if (!vThumbRef.current || !vTrackRef.current || !containerRef.current) {
      return;
    }

    const { isMouseDown, start = 0, end = 0 } = vValues.current;

    if (isMouseDown) {
      const deltaTop = e.clientY - start;
      let top = deltaTop + end;

      if (deltaTop + end < 0) {
        top = 0;
      } else if (deltaTop + end + vThumbH > vTrackH) {
        top = vTrackH - vThumbH;
      }

      containerRef.current.scrollTop = (vDeltaContent / vDeltaThumb) * top;
      setVThumbTop(top);
    }
  }, [vThumbH, vTrackH, vDeltaContent, vDeltaThumb]);

  useEffect(() => {
    document.body.addEventListener('mouseup', turnOffScroll);
    document.body.addEventListener('mouseleave', turnOffScroll);
    document.body.addEventListener('mousemove', scrollContent);

    return () => {
      document.body.removeEventListener('mouseup', turnOffScroll);
      document.body.removeEventListener('mouseleave', turnOffScroll);
      document.body.removeEventListener('mousemove', scrollContent);
    };
  }, [turnOffScroll, scrollContent]);

  return (
    <div className={classNames('scrollik-wrapper', className)}>
      <div
        className="scrollik-container"
        ref={containerRef}
      >
        <div ref={contentRef}>
          {children}
        </div>
      </div>
      <div
        ref={vTrackRef}
        className={classNames('scrollik-vTrack', {
          'scrollik-trackHidden': !vDeltaContent,
          'scrollik-trackOverlay': overlay,
        }, vTrackClassName)}
      >
        <div
          ref={vThumbRef}
          className={classNames('scrollik-vThumb', vThumbClassName)}
          onMouseDown={handleVThumbMouseDown}
        />
      </div>
    </div>
  );
};

export default Scrollik;
