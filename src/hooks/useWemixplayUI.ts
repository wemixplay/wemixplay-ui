import { WemixplayUIContext } from '@/components';
import { useCallback, useContext } from 'react';

const useWemixplayUI = () => {
  const { theme, setThemeData } = useContext(WemixplayUIContext);

  const changeTheme = useCallback(
    (theme: 'dark' | 'light') => {
      document.body.setAttribute('data-theme', theme);
      setThemeData(theme);
    },
    [setThemeData]
  );

  return { theme, changeTheme };
};

export default useWemixplayUI;
