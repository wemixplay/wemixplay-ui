import type { Meta, StoryObj, StoryFn } from '@storybook/react';
import RadioButton from '@/components/inputs/radiobox/RadioButton';
import style from '../../../styles/StrCheckBox.module.scss';
import classNames from 'classnames';
import { useState } from 'react';

type StoryComponent = StoryObj<typeof RadioButton>;
type StoryTemplate = StoryFn<typeof RadioButton>;

const cx = classNames.bind(style);

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  component: RadioButton,
  tags: ['autodocs']
} as Meta<typeof RadioButton>;

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
        <RadioButton
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
    children: 'TEST Check'
  },
  argTypes: {
    checkValue: { control: false },
    value: { control: false },
    handleChange: { control: false }
  },
  render: Template
};
