'use client';

import React from 'react';
import classNames from 'classnames/bind';
import style from './OgMetaDataPreview.module.scss';
import { SvgIcoDeleteX } from '@/assets/svgs';

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
          <SvgIcoDeleteX />
        </button>

        <div className={cx('preview-box')}>
          <p className={cx('preview-img')}>
            <img
              src={
                'https://cache.wemixplay.com/ADMIN-CONSOLE/GAME_DETAIL_INFO/ncgl/12ec3912-57e7-43d4-a124-5f4d1a7552f7.jpg'
              }
              alt=""
            />
          </p>
          <div className={cx('preview-data')}>
            <strong className={cx('title')}>WEMIX PLAY</strong>
            <p className={cx('link')}>{ogMetaData.name}</p>
            <p className={cx('description')}>
              @MIR4 I want some help to reach 45 level in a certain amount of time i am thinking of
              putting money in the game and i wanna ask you what are the best items i can buy to
              upgrade my exp gain?#MIR #LegnedofMIR @MIR4 I want some help to reach 45 level in a
              certain amount of time i am thinking of putting money in the game and i wanna ask you
              what are the best items i can buy to upgrade my exp gain?#MIR #LegnedofMIR
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OgMetaDataPreview;
