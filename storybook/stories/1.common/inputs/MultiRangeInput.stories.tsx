import type { Meta, StoryObj, StoryFn } from '@storybook/react';
import MultiRangeInput from '@/components/inputs/multiRangeInput/MultiRangeInput';

type StoryComponent = StoryObj<typeof MultiRangeInput>;
type StoryTemplate = StoryFn<typeof MultiRangeInput>;

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  component: MultiRangeInput,
  tags: ['autodocs']
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
