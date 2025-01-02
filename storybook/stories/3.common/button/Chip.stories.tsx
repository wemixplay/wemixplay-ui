import type { Meta, StoryObj, StoryFn } from '@storybook/react';
import Chip from '@/components/buttons/Chip';

type StoryComponent = StoryObj<typeof Chip>;
type StoryTemplate = StoryFn<typeof Chip>;

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  component: Chip,
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text'
    }
  }
} as Meta<typeof Chip>;

const Template: StoryTemplate = (args) => {
  return <Chip {...args} />;
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
    text: 'Test Chip'
  },
  render: Template
};
