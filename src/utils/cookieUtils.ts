import Cookies from 'js-cookie';

type GetCookie = {
  key: string;
};
type SetCookie = {
  key: string;
  value: string;
  expireDays?: number;
};

const getCookie = ({ key }: GetCookie) => {
  if (!key) {
    return null;
  }
  return Cookies.get(key);
};

const setCookie = ({ key, value, expireDays }: SetCookie) => {
  Cookies.set(key, value, expireDays && { expires: expireDays });
};

const removeCookie = ({ key }: GetCookie) => {
  if (!getCookie({ key })) {
    return;
  }
  Cookies.remove(key);
};

export { getCookie, setCookie, removeCookie };
