import Person from '@/components/avatars/Person';
import type { Meta, StoryObj, StoryFn } from '@storybook/react';

type StoryComponent = StoryObj<typeof Person>;
type StoryTemplate = StoryFn<typeof Person>;

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  component: Person,
  tags: ['autodocs']
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
    size: 'medium'
  },
  render: Template
};
