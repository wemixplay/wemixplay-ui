import type { Meta, StoryObj, StoryFn } from '@storybook/react';
import MultiRangeInput from '@/components/inputs/multiRangeInput/MultiRangeInput';

type StoryComponent = StoryObj<typeof MultiRangeInput>;
type StoryTemplate = StoryFn<typeof MultiRangeInput>;

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  component: MultiRangeInput,
  tags: ['autodocs'],
  argTypes: {
    min: {
      control: { type: 'number' },
      defaultValue: 0
    },
    max: {
      control: { type: 'number' },
      defaultValue: 100
    },
    step: {
      control: { type: 'number' },
      defaultValue: 1
    },
    thumbSize: {
      control: { type: 'number' },
      defaultValue: 20
    },
    sliderHeight: {
      control: { type: 'number' },
      defaultValue: 4
    },
    thumbBorderColor: {
      control: { type: 'color' }
    },
    thumbColor: {
      control: { type: 'color' }
    },
    trackColor: {
      control: { type: 'color' }
    },
    rangeColor: {
      control: { type: 'color' }
    }
  }
} as Meta<typeof MultiRangeInput>;

const Template: StoryTemplate = (args) => {
  return <MultiRangeInput {...args} />;
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
    min: 0,
    max: 100
  },
  render: Template
};
