import type { Meta, StoryObj, StoryFn } from '@storybook/react';
import SolidSquareButton from '@/components/buttons/SolidSquareButton';

type StoryComponent = StoryObj<typeof SolidSquareButton>;
type StoryTemplate = StoryFn<typeof SolidSquareButton>;

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  component: SolidSquareButton,
  tags: ['autodocs']
} as Meta<typeof SolidSquareButton>;

const Template: StoryTemplate = (args) => {
  return <SolidSquareButton {...args} />;
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
