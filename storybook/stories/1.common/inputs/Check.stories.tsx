import type { Meta, StoryObj, StoryFn } from '@storybook/react';
import React, { useEffect, useState } from 'react';
import Check from '@/components/inputs/checkbox/Check';
import { makeCxFunc } from '@/utils/forReactUtils';

import style from '../../../styles/StrCheckBox.module.scss';

type StoryComponent = StoryObj<typeof Check>;
type StoryTemplate = StoryFn<typeof Check>;

const cx = makeCxFunc(style);

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  component: Check,
  tags: ['autodocs']
} as Meta<typeof Check>;

const Template: StoryTemplate = (args) => {
  const [value, setValue] = useState<boolean>(!!args.value);

  const handleChange = (newValue: boolean) => {
    setValue(newValue);
  };

  useEffect(() => {
    setValue(!!args.value);
  }, [args.value]);

  return (
    <div className={cx('checkbox-cont')}>
      <p className={cx('interaction-area')}>
        <Check {...args} value={value} handleChange={handleChange} />
      </p>

      <div className={cx('result')}>DATA: {String(value)}</div>
    </div>
  );
};

export const Default: StoryComponent = {
  parameters: {
    docs: {
      description: {
        story: ''
      }
    }
  },
  args: {},
  render: Template
};
