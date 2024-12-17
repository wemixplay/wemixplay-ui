import React, { ReactElement, ReactNode } from 'react';

import { makeCxFunc } from '@/utils/forReactUtils';

import style from './BulletList.module.scss';

const cx = makeCxFunc(style);

interface Props {
  className?: string;
  list: (ReactElement | string)[] | ReactNode[];
  icon?: ReactElement | string;
}

const BulletList = ({ className = '', list, icon }: Props) => {
  //logic

  return (
    <ul className={cx('bullet-list', className, { 'default-circle': !icon })}>
      {list?.map((item, index) => (
        <li key={index}>
          {icon && <i className={cx('bullet-icon')}>{icon}</i>}
          {item}
        </li>
      ))}
    </ul>
  );
};

export type { Props as BulletListProps };
export default BulletList;
