import React from 'react';
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
declare const WemixplayUIContext: React.Context<WemixplayUIContextType>;
declare const WemixplayUIProvider: ({ children, theme }: WemixplayUIProviderProps) => React.JSX.Element;
export type { WemixplayUIContextType };
export { WemixplayUIContext };
export default WemixplayUIProvider;
