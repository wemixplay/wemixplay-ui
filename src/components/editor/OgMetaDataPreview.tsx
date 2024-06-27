'use client';

import React from 'react';
import classNames from 'classnames/bind';
import style from './OgMetaDataPreview.module.scss';

type Props = {
  className?: string;
  ogMetaData: Record<string, string> | null;
  handleDeleteOgMetaData?: ({ urls, type }: { urls: string[]; type: 'add' | 'delete' }) => void;
};

const cx = classNames.bind(style);

const OgMetaDataPreview = ({ className = '', ogMetaData, handleDeleteOgMetaData }: Props) => {
  //logic

  return (
    <div className={cx(className, 'og-meta-data-preview')}>
      <div className={cx('og-meta-data-content')}>
        <button
          className={cx('btn-img-delete')}
          onClick={() => handleDeleteOgMetaData({ urls: [ogMetaData.url], type: 'delete' })}
        >
          delete
        </button>
        <div className={cx('preview-box')}> {ogMetaData.name}</div>
      </div>
    </div>
  );
};

export default OgMetaDataPreview;
