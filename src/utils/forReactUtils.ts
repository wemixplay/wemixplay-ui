import { ArgumentArray } from 'classnames';
import classNames from 'classnames/bind';
import clsx from 'clsx';

/**
 * classNames/bind 모듈을 같이 활용하여 컴포넌트별 uniq한 className과 global className을 같이 반환하는 함수
 *
 * 사용법은 classNames.bind 함수와 동일합니다.
 *
 * @param {{ readonly [key: string]: string }} style - *.module.scss를 import한 객체
 * @returns CSS className 결과물
 */
export const makeCxFunc = (style: { readonly [key: string]: string }) => {
  // const cx = classNames.bind(style);

  return (...args: ArgumentArray) => {
    const classNames = args.reduce((acc, cur, index) => {
      if (typeof cur === 'string') {
        acc += `${cur} `;
        args[index] = style[cur];
      } else if (typeof cur === 'object') {
        const newObj = {};

        acc += Object.entries(cur).reduce((names, [key, value]) => {
          newObj[style[key]] = !!value;

          if (value) {
            names += ` ${key}`;
          }

          return names;
        }, '');

        args[index] = newObj;
      }

      return acc;
    }, '');

    const arr = `${classNames} ${clsx(args)}`.trim().split(' ');

    const uniqueArr = arr.filter((element, index) => {
      return arr.indexOf(element) === index;
    });

    return uniqueArr.join(' ');
  };
};

export const cn = (
  ...args: Array<string | number | boolean | undefined | Record<string, JSONObject>>
) => {
  const classNames = args.reduce<string>((acc, cur) => {
    if (typeof cur === 'string') {
      acc += ` ${cur}`;
    } else if (typeof cur === 'object') {
      acc += Object.entries(cur ?? {}).reduce((names, [key, value]) => {
        if (value) {
          names += ` ${key}`;
        }

        return names;
      }, '');
    }

    return acc;
  }, '');

  return classNames;
};
