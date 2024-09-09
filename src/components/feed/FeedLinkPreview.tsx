'use client';

import React, { MouseEvent, useCallback } from 'react';
import style from './FeedLinkPreview.module.scss';
import { SvgIcoDeleteX } from '@/assets/svgs';
import WpImage from '../image/WpImage';
import { makeCxFunc } from '@/utils/forReactUtils';

type Props = {
  className?: string;
  ogMetaData: {
    title: string;
    description?: string;
    image?: string;
    url: string;
  };
  handleDeleteOgMetaData?: ({ urls, type }: { urls: string[]; type: 'add' | 'delete' }) => void;
};

const cx = makeCxFunc(style);

const FeedLinkPreview = ({ className = '', ogMetaData, handleDeleteOgMetaData }: Props) => {
  const windowOpenExternalUrl = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (!ogMetaData?.url || handleDeleteOgMetaData) {
        return;
      }

      const anchorTag = document.createElement('a');

      anchorTag.href = ogMetaData.url;
      anchorTag.target = '_blank';

      anchorTag.click();
      anchorTag.remove();
      e.stopPropagation();
    },
    [ogMetaData?.url, handleDeleteOgMetaData]
  );

  return (
    <div
      className={cx(className, 'og-meta-data-preview', {
        'has-click-event': !handleDeleteOgMetaData
      })}
      onClick={windowOpenExternalUrl}
    >
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
            {!!ogMetaData.description && (
              <p className={cx('description')}>{ogMetaData.description}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export type { Props as FeedLinkPreviewProps };
export default FeedLinkPreview;
