import type { Meta, StoryObj, StoryFn } from '@storybook/react';
import Rating from '@/components/ratings/Rating';

type StoryComponent = StoryObj<typeof Rating>;
type StoryTemplate = StoryFn<typeof Rating>;

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  component: Rating,
  tags: ['autodocs']
} as Meta<typeof Rating>;

const Template: StoryTemplate = (args) => {
  return <Rating {...args} />;
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