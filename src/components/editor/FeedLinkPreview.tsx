'use client';

import React from 'react';
import classNames from 'classnames/bind';
import style from './FeedLinkPreview.module.scss';
import { SvgIcoDeleteX } from '@/assets/svgs';
import WpImage from '../image/WpImage';

type Props = {
  className?: string;
  ogMetaData: {
    title: string;
    desdescription?: string;
    image?: string;
    url: string;
  };
  handleDeleteOgMetaData?: ({ urls, type }: { urls: string[]; type: 'add' | 'delete' }) => void;
};

const cx = classNames.bind(style);

const FeedLinkPreview = ({ className = '', ogMetaData, handleDeleteOgMetaData }: Props) => {
  //logic

  return (
    <div className={cx(className, 'og-meta-data-preview')}>
      <div className={cx('og-meta-data-content')}>
        {!!handleDeleteOgMetaData && (
          <button
            className={cx('btn-img-delete')}
            onClick={() => handleDeleteOgMetaData({ urls: [ogMetaData.url], type: 'delete' })}
          >
            <SvgIcoDeleteX />
          </button>
        )}

        <div className={cx('preview-box')}>
          {!!ogMetaData.image && (
            <p className={cx('preview-img')}>
              <WpImage src={ogMetaData.image} alt={ogMetaData.title} />
            </p>
          )}

          <div className={cx('preview-data')}>
            <strong className={cx('title')}>{ogMetaData.title || '-'}</strong>
            {!!ogMetaData.url && <p className={cx('link')}>{ogMetaData.url}</p>}
            {!!ogMetaData.desdescription && (
              <p className={cx('description')}>
                @MIR4 I want some help to reach 45 level in a certain amount of time i am thinking
                of putting money in the game and i wanna ask you what are the best items i can buy
                to upgrade my exp gain?#MIR #LegnedofMIR @MIR4 I want some help to reach 45 level in
                a certain amount of time i am thinking of putting money in the game and i wanna ask
                you what are the best items i can buy to upgrade my exp gain?#MIR #LegnedofMIR
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export type { Props as FeedLinkPreviewProps };
export default FeedLinkPreview;
