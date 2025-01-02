import type { Meta, StoryObj, StoryFn } from '@storybook/react';
import CheckButton from '@/components/inputs/checkbox/CheckButton';

type StoryComponent = StoryObj<typeof CheckButton>;
type StoryTemplate = StoryFn<typeof CheckButton>;

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  component: CheckButton,
  tags: ['autodocs']
} as Meta<typeof CheckButton>;

const Template: StoryTemplate = (args) => {
  return <CheckButton {...args} />;
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
  render: Template
};
