type GetCookie = {
    key: string;
};
type SetCookie = {
    key: string;
    value: string;
    expireDays?: number;
};
declare const getCookie: ({ key }: GetCookie) => any;
declare const setCookie: ({ key, value, expireDays }: SetCookie) => void;
declare const removeCookie: ({ key }: GetCookie) => void;
export { getCookie, setCookie, removeCookie };
