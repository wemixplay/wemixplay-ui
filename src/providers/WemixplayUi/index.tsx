import React, { createContext, useEffect, useMemo, useState } from 'react';
import styles from './wemixplay-ui.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

type WemixplayUIContextType = {
  /** wemixplay ui 현재 테마 */
  theme: 'dark' | 'light';
  setThemeData: (theme: 'dark' | 'light') => void;
};

type WemixplayUIProviderProps = {
  /** wemixplay ui 현재 테마 */
  theme?: 'dark' | 'light';
  children: React.ReactNode;
};

const initialValue: WemixplayUIContextType = {
  theme: 'light',
  setThemeData: (newTheme) => {}
};

const WemixplayUIContext = createContext<WemixplayUIContextType>(initialValue);

const WemixplayUIProvider = ({ children, theme }: WemixplayUIProviderProps) => {
  const [themeData, setThemeData] = useState(theme);

  const value = useMemo(
    () => ({ ...initialValue, theme: themeData, setThemeData }),
    [themeData, setThemeData]
  );

  useEffect(() => {
    setThemeData(theme);
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <WemixplayUIContext.Provider value={value}>
      <div id="wemixplay-ui" className={cx('wemixplay-ui')}>
        {children}
      </div>
    </WemixplayUIContext.Provider>
  );
};

export type { WemixplayUIContextType };
export { WemixplayUIContext };
export default WemixplayUIProvider;

