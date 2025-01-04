'use client';

import React, { createContext, useContext } from 'react';

interface IconContextProps {
  width?: number;
  height?: number;
}

const IconContext = createContext<IconContextProps>({
  height: 100
});

export const IconProvider: React.FC<{
  children: React.ReactNode;
  width?: number;
  height?: number;
}> = ({ children, width, height = 100 }) => {
  return (
    <IconContext.Provider value={{ width, height }}>
      {children}
    </IconContext.Provider>
  );
};

export const useIconContext = () => useContext(IconContext);
