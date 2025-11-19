import { useCallback, useState } from 'react';

const useToggle = (initState = false) => {
  const [isOpen, setIsOpen] = useState(initState);

  const handleOpen = useCallback(() => setIsOpen(true), []);
  const handleClose = useCallback(() => setIsOpen(false), []);
  const handleToggle = useCallback(() => setIsOpen((prev) => !prev), []);

  return { isOpen, handleOpen, handleClose, handleToggle };
};

export default useToggle;
