import React, { createElement, useMemo, useState } from 'react';
import TextInput from '@/components/inputs/textInput/TextInput';
import ListMap from '@/components/list/ListMap';
import * as SvgIcons from '@/assets/svgs';
import { copyClipboard } from '@/utils/browserUtils';
import { makeCxFunc } from '@/utils/forReactUtils';

import style from './SvgFinder.module.scss';

interface PropsType {}

const cx = makeCxFunc(style);

const SvgFinder = ({}: PropsType) => {
  const [name, setName] = useState('');

  const list = useMemo(() => {
    return Object.entries(SvgIcons).filter(([key]) =>
      key.toLowerCase().includes(name.toLowerCase())
    );
  }, [name]);

  return (
    <article className={cx('svg-finder')}>
      <div className={cx('find-input')}>
        <TextInput
          className={cx('text-input')}
          type="search"
          placeholder="찾고자 하는 SVG 컴포넌트명을 입력하세요"
          value={name}
          handleChange={setName}
        />
      </div>
      <ul className={cx('svg-list')}>
        <ListMap
          list={list}
          noDataMsg={<div className={cx('no-data')}>찾으시는 SVG 컴포넌트가 없습니다.</div>}
        >
          {({ item: [name, component] }) => (
            <li key={name} className={cx('svg-item')}>
              <div
                className={cx('svg-componen-box')}
                onClick={() => {
                  copyClipboard({ text: `<${name} />` });
                  alert(`<${name} />`);
                }}
              >
                <span className={cx('icon-box')}>
                  {createElement(component, { width: 18, height: 18 }, <></>)}
                </span>
              </div>
              <strong className={cx('svg-item-title')}>{name}</strong>
            </li>
          )}
        </ListMap>
      </ul>
    </article>
  );
};

export default SvgFinder;
