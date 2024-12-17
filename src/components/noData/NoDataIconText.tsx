import React, { CSSProperties, ReactElement } from 'react';

import { makeCxFunc } from '@/utils/forReactUtils';

import { SvgIcoPlayLogo } from '@/assets/svgs';

import style from './NoData.module.scss';

const cx = makeCxFunc(style);

interface PropsType {
  /**
   * 데이터가 없을때 노출시킬 메세지 내용
   */
  nullText?: ReactElement | string;
  icon?: ReactElement;
  style?: CSSProperties;
  className?: string;
}

const NoDataIconText = ({
  className,
  nullText = 'no data',
  icon = <SvgIcoPlayLogo />,
  style
}: PropsType) => {
  return (
    <div className={cx('no-data', className)} style={style}>
      <i className={cx('no-data-icon')}>{icon}</i>
      {typeof nullText === 'object' ? (
        <p className={cx('no-data-text')}>{nullText}</p>
      ) : (
        <p className={cx('no-data-text')} dangerouslySetInnerHTML={{ __html: nullText }}></p>
      )}
    </div>
  );
};

export type { PropsType as NoDataProps };
export default NoDataIconText;
