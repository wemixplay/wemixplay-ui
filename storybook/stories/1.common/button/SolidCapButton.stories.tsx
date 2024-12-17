import SolidCapButton from '@/components/buttons/SolidCapButton';
import type { Meta, StoryObj, StoryFn } from '@storybook/react';

type StoryComponent = StoryObj<typeof SolidCapButton>;
type StoryTemplate = StoryFn<typeof SolidCapButton>;

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  component: SolidCapButton,
  tags: ['autodocs']
} as Meta<typeof SolidCapButton>;

const Template: StoryTemplate = (args) => {
  return <SolidCapButton {...args} />;
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
    children: 'BUTTON',
    size: 'small'
  },
  render: Template
};
