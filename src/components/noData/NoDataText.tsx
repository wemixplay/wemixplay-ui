import React, { CSSProperties, ReactElement } from 'react';

import { makeCxFunc } from '@/utils/forReactUtils';

import style from './NoData.module.scss';

const cx = makeCxFunc(style);

interface PropsType {
  /**
   * 데이터가 없을때 노출시킬 메세지 내용
   */
  nullText?: ReactElement | string;
  style?: CSSProperties;
  className?: string;
}

const NoDataText = ({ className, nullText = 'no data', style = { paddingTop: 8 } }: PropsType) => {
  return (
    <div className={cx('no-data', className)} style={style}>
      <p className={cx('no-data-text')}>{nullText}</p>
    </div>
  );
};

export type { PropsType as NoDataTextProps };
export default NoDataText;
