import { WemixplayUIContext } from '@/components';
import { useContext } from 'react';

const useWemixplayUI = () => {
  const { theme, setThemeData } = useContext(WemixplayUIContext);

  return { theme, changeTheme: setThemeData };
};

export default useWemixplayUI;
