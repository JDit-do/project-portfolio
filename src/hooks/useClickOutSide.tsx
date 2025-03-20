import { useEffect, useRef } from 'react';

const useClickOutSide = <T extends HTMLElement>(callback: () => void) => {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!(ref.current && !ref.current.contains(e.target as Node))) return;
      callback();
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.addEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return ref;
};

export default useClickOutSide;
