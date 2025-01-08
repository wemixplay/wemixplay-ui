'use client';

import React, { ReactElement } from 'react';
import { makeCxFunc } from '@/utils/forReactUtils';

import style from './Color.module.scss';
import ListMap from '@/components/list/ListMap';
import VStack from '@/components/layouts/VStack';
import Typography from '@/components/typography/Typography';
import { SEMANTIC_SHADOWS, TYPOGRAPHY_COLORS } from '@/constants/sematicCssVariables.c';
import HStack from '@/components/layouts/HStack';

const cx = makeCxFunc(style);
export type listItemProps = {
  name?: string;
  value?: string;
};

const SEMANTIC_TYPOGRAPHY_COLORS = Object.values(TYPOGRAPHY_COLORS).reduce(
  (acc, cur) => {
    const [kind] = cur.split('-');

    acc[kind] = [...(acc[kind] || []), cur];

    return acc;
  },
  {} as Record<string, string[]>
);

const Color = () => {
  console.log('test!!');
  return (
    <>
      <VStack tag="article" rowGap={32} className={cx('palette')}>
        {Object.entries(SEMANTIC_TYPOGRAPHY_COLORS).map(([kind, colorVars]) => (
          <div key={kind}>
            <Typography.H type="title-03-b" hLevel={2}>
              --wp-semantic-{kind}-
            </Typography.H>
            <Typography.Span type="label-01-reading-r">
              사용 예시: {`var(--wp-semantic-${colorVars[0]})`}
            </Typography.Span>
            <ul className={cx('palette-list')}>
              <ListMap list={colorVars}>
                {({ item }) => {
                  const [_, ...rest] = item.split('-');
                  const color = rest.join('-');

                  return (
                    <li key={item}>
                      <div
                        className={cx('color-box')}
                        style={{ backgroundColor: `var(--wp-semantic-${item})` }}
                      ></div>
                      <em>{color}</em>
                    </li>
                  );
                }}
              </ListMap>
            </ul>
          </div>
        ))}
      </VStack>
      <VStack>
        {Object.values(SEMANTIC_SHADOWS).map((shadowVar) => (
          <VStack key={shadowVar} gap={16}>
            <VStack>
              <Typography.H type="title-03-b" hLevel={2}>
                --wp-semantic-{shadowVar}-
              </Typography.H>
              <Typography.Span type="label-01-reading-r">
                사용 예시: {`var(--wp-semantic-${shadowVar})`}
              </Typography.Span>
            </VStack>
            <VStack gap={16}>
              <div
                className={cx('shadow-box')}
                style={{ boxShadow: `var(--wp-semantic-${shadowVar})` }}
              ></div>
              <Typography.Span type="label-01-reading-r">{shadowVar}</Typography.Span>
            </VStack>
          </VStack>
        ))}
      </VStack>
    </>
  );
};

export default Color;
