import type { Meta, StoryObj, StoryFn } from '@storybook/react';
import RadioBox from '@/components/inputs/radiobox/RadioBox';
import classNames from 'classnames/bind';
import style from '../styles/StrCheckBox.module.scss';
import { useState } from 'react';

type StoryComponent = StoryObj<typeof RadioBox>;
type StoryTemplate = StoryFn<typeof RadioBox>;

const cx = classNames.bind(style);

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  component: RadioBox,
  tags: ['autodocs']
} as Meta<typeof RadioBox>;

const Template: StoryTemplate = (args) => {
  const list = [1, 2, 3, 4];

  const [value, setValue] = useState<number>();

  const handleChange = (value: number, name: string) => {
    setValue(value);

    args.handleChange && args.handleChange(value, name);
  };

  return (
    <div className={cx('checkbox-cont')}>
      {list.map((num) => (
        <RadioBox
          key={num}
          {...args}
          children={`${args.children} ${num}`}
          checkValue={num}
          value={value}
          handleChange={handleChange}
        />
      ))}

      <div className={cx('result')}>DATA: {String(value ?? '')}</div>
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
    name: 'test',
    children: 'TEST'
  },
  argTypes: {
    checkValue: { control: false },
    value: { control: false },
    handleChange: { control: false }
  },
  render: Template
};
