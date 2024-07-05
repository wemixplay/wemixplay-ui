import type { Meta, StoryObj, StoryFn } from '@storybook/react';
import FeedBox from '@/components/feed/FeedBox';

type StoryComponent = StoryObj<typeof FeedBox>;
type StoryTemplate = StoryFn<typeof FeedBox>;

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  component: FeedBox,
  tags: ['autodocs']
} as Meta<typeof FeedBox>;

const Template: StoryTemplate = (args) => {
  return <FeedBox {...args} />;
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
