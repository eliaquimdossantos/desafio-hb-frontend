'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface LayoutContextProps {
  toolbarTitle: string;
  setToolbarTitle: (title: string) => void;
}

const LayoutContext = createContext<LayoutContextProps | undefined>(undefined);

interface LayoutProviderProps {
  children: ReactNode;
}

export const LayoutProvider = ({ children }: LayoutProviderProps) => {
  const [toolbarTitle, setToolbarTitle] = useState('Gerenciador Hubbi');

  return (
    <LayoutContext.Provider
      value={{
        toolbarTitle: `Gerenciador Hubbi - ${toolbarTitle}`,
        setToolbarTitle
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }
  return context;
};