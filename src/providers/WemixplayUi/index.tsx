import React, { createContext } from 'react';
import styles from './wemixplay-ui.module.scss';
import clsx from 'clsx';

const cx = clsx(styles);

type WemixplayUIContext = {
  //
};

type WemixplayUIProviderProps = {
  children: React.ReactNode;
};

const WemixplayUIContext = createContext<WemixplayUIContext>({});

const WemixplayUIProvider = ({ children }: WemixplayUIProviderProps) => {
  return <WemixplayUIContext.Provider value={{}}>{children}</WemixplayUIContext.Provider>;
};

export default WemixplayUIProvider;
