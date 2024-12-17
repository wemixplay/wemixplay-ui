import React, { CSSProperties, MouseEvent, ReactElement } from 'react';

import { makeCxFunc } from '@/utils/forReactUtils';

import { SvgIcoPlayLogo } from '@/assets/svgs';

import SolidSquareButton from '@/components/buttons/SolidSquareButton';

import style from './NoData.module.scss';

const cx = makeCxFunc(style);

interface PropsType {
  className?: string;
  /**
   * 데이터가 없을때 노출시킬 메세지 내용
   */
  icon?: ReactElement;
  nullText?: ReactElement | string;
  buttonText?: string;
  style?: CSSProperties;
  handleBtnClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

const NoDataAction = ({
  className,
  nullText = 'no data',
  icon = <SvgIcoPlayLogo />,
  buttonText = 'button text',
  style = { paddingTop: 80 },
  handleBtnClick
}: PropsType) => {
  return (
    <div className={cx('no-data', className)} style={style}>
      <i className={cx('no-data-icon')}>{icon}</i>
      <p className={cx('no-data-text')}>{nullText}</p>
      <div className={cx('no-data-action')}>
        <SolidSquareButton children={buttonText} size="medium" onClick={handleBtnClick} />
      </div>
    </div>
  );
};

export type { PropsType as NoDataActionProps };
export default NoDataAction;
