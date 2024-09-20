import type { Meta, StoryObj, StoryFn } from '@storybook/react';
import CheckBox, { CheckBoxProps } from '@/components/inputs/checkbox/CheckBox';
import RoundCheckBox from '@/components/inputs/checkbox/RoundCheckBox';
import { FunctionComponent, useState } from 'react';
import classNames from 'classnames/bind';
import style from '../styles/StrCheckBox.module.scss';
import React from 'react';

type StoryComponent = StoryObj<FunctionComponent<CheckBoxProps>>;
type StoryTemplate = StoryFn<FunctionComponent<CheckBoxProps>>;

const cx = classNames.bind(style);

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  component: CheckBox,
  tags: ['autodocs'],
  globals: { theme: 'dark' }
} as Meta<FunctionComponent<CheckBoxProps>>;

const Template: StoryTemplate = (args) => {
  const [value, setValue] = useState<string | number | boolean>(
    args.unCheckValue as string | number | boolean
  );

  const handleChange = (newValue: string | number, name: string) => {
    setValue(newValue);
  };

  return (
    <div className={cx('checkbox-cont')}>
      <p className={cx('interaction-area')}>
        <CheckBox {...args} value={value} handleChange={handleChange} />
      </p>

      <div className={cx('result')}>DATA: {String(value)}</div>
    </div>
  );
};

const MultipleTemplate: StoryTemplate = (args) => {
  const list = [1, 2, 3, 4];

  const [data, setData] = useState<number[]>([1, 2]);

  const handleChange = (value: number[], name: string) => {
    setData(value);
  };

  return (
    <div className={cx('checkbox-cont')}>
      {list.map((num) => (
        <CheckBox
          key={num}
          {...args}
          children={`${args.children} ${num}`}
          checkValue={num}
          value={data}
          handleChange={handleChange}
        />
      ))}
      <div className={cx('result')}>DATA: [{data.join(', ')}]</div>
    </div>
  );
};

const RoundCheckBoxTemplate: StoryTemplate = (args) => {
  const [value, setValue] = useState<string | number | boolean | undefined>(args.unCheckValue);

  const handleChange = (newValue: string | number, name: string) => {
    setValue(newValue);
  };
  return (
    <div className={cx('checkbox-cont')}>
      <RoundCheckBox
        {...args}
        value={value}
        checkValue={args.checkValue}
        handleChange={handleChange}
      />
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
  args: {
    children: 'Default 상위 위계로 활성화 여부를 제어할 때 사용합니다.',
    checkValue: 'test',
    unCheckValue: '-'
  },
  argTypes: {
    value: { control: false },
    handleChange: { control: false }
  },
  render: Template
};

export const MultipleCheckBox: StoryComponent = {
  parameters: {
    controls: false,
    docs: {
      description: {
        story: ''
      }
    }
  },
  args: {
    name: 'test',
    children: 'TEST'
  },
  argTypes: {
    checkValue: { control: false },
    unCheckValue: { control: false },
    value: { control: false },
    handleChange: { control: false }
  },
  render: MultipleTemplate
};

export const RoundCheckBoxComponent: StoryComponent = {
  parameters: {
    docs: {
      description: {
        story: ''
      }
    }
  },
  args: {
    children: 'Round 보통 위계로 활성화 여부를 제어할 때 사용합니다.',
    checkValue: 'test',
    unCheckValue: '-'
  },
  argTypes: {
    value: { control: false },
    checkValue: { control: false },
    handleChange: { control: false }
  },
  render: RoundCheckBoxTemplate
};
