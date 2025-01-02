import React, { createContext } from 'react';
import styles from './wemixplay-ui.module.scss';
import { makeCxFunc } from '@/utils/forReactUtils';

const cx = makeCxFunc(styles);

type WemixplayUIContextType = {
  /** wemixplay ui 현재 테마 */
  theme?: 'dark' | 'light';
};

type WemixplayUIProviderProps = {
  /** wemixplay ui 현재 테마 */
  theme?: 'dark' | 'light';
  children: React.ReactNode;
};

const WemixplayUIContext = createContext<WemixplayUIContextType>({});

const WemixplayUIProvider = ({ children, theme }: WemixplayUIProviderProps) => {
  return (
    <WemixplayUIContext.Provider value={{ theme }}>
      <div className={cx('wemixplay-ui')} data-theme={theme}>
        {children}
      </div>
    </WemixplayUIContext.Provider>
  );
};

export type { WemixplayUIContextType };
export { WemixplayUIContext };
export default WemixplayUIProvider;
