import { RefObject, useEffect } from 'react';

const defaultMutationObserverOptions = { subtree: true, childList: true };

const useMutationObserver = (
  cb: Function,
  viewRef: RefObject<HTMLDivElement>,
  options: MutationObserverInit = defaultMutationObserverOptions,
) => {
  useEffect(() => {
    if (!viewRef.current) {
      return;
    }

    const observer = new MutationObserver(() => {
      cb();
    });

    observer.observe(viewRef.current, options || { subtree: true, childList: true });

    return () => {
      observer.disconnect();
    };
  }, [cb]);
};

export default useMutationObserver;
