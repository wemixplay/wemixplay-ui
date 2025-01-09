declare const useWemixplayUI: () => {
    theme: "dark" | "light";
    changeTheme: (theme: 'dark' | 'light') => void;
};
export default useWemixplayUI;
