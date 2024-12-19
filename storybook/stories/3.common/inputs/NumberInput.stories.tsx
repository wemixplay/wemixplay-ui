import type { Meta, StoryObj, StoryFn } from '@storybook/react';
import { debounce } from 'lodash-es';
import { useMemo } from 'react';
import { useState } from 'react';
import NumberInput from '@/components/inputs/numberInput/NumberInput';

type StoryComponent = StoryObj<typeof NumberInput>;
type StoryTemplate = StoryFn<typeof NumberInput>;

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  component: NumberInput,
  tags: ['autodocs']
} as Meta<typeof NumberInput>;

const Template: StoryTemplate = (args) => {
  const [data, setData] = useState('');

  const handleChange = useMemo(
    () =>
      debounce((value: string) => {
        setData(value);
      }, 500),
    []
  );

  return <NumberInput {...args} value={data} handleChange={handleChange} />;
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
