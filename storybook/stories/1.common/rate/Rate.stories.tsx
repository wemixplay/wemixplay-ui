import type { Meta, StoryObj, StoryFn } from '@storybook/react';
import Rate from '@/components/rate/Rate';

type StoryComponent = StoryObj<typeof Rate>;
type StoryTemplate = StoryFn<typeof Rate>;

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  component: Rate,
  tags: ['autodocs'],
  argTypes: {
    rateType: {
      control: {
        type: 'select',
        options: ['increase', 'decrease', 'complement']
      }
    },
    rateText: {
      control: {
        type: 'text'
      }
    }
  }
} as Meta<typeof Rate>;

const Template: StoryTemplate = (args) => {
  return <Rate {...args} />;
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
