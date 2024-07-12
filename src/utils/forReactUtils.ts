import { ArgumentArray } from 'classnames';
import classNames from 'classnames/bind';

export const makeCxFunc = (style: { readonly [key: string]: string }) => {
  const cx = classNames.bind(style);

  return (...args: ArgumentArray) => {
    const classNames = args.reduce((acc, cur) => {
      if (typeof cur === 'string') {
        acc += ` ${cur}`;
      } else if (typeof cur === 'object') {
        acc += Object.entries(cur).reduce((names, [key, value]) => {
          if (value) {
            names += ` ${key}`;
          }

          return names;
        }, '');
      }

      return acc;
    }, '');

    const arr = `${classNames} ${cx(args)}`.trim().split(' ');

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
