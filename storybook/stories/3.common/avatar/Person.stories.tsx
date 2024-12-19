import Person from '@/components/avatars/Person';
import type { Meta, StoryObj, StoryFn } from '@storybook/react';

type StoryComponent = StoryObj<typeof Person>;
type StoryTemplate = StoryFn<typeof Person>;

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  component: Person,
  tags: ['autodocs'],
  argTypes: {
    customSize: {
      control: 'range',
      min: 0,
      max: 100,
      step: 1,
      defaultValue: 50
    }
  }
} as Meta<typeof Person>;

const Template: StoryTemplate = (args) => {
  return <Person {...args} />;
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
    size: 'medium',
    customSize: 50
  },
  render: Template
};
