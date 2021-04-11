import { useEffect } from 'react';

const useWindowResize = (resizeEffect: () => void, deps?: ReadonlyArray<any>) => {
  useEffect(() => {
    window.addEventListener('resize', resizeEffect);

    return () => window.removeEventListener('resize', resizeEffect);
  }, deps);
};

export default useWindowResize;
