import FeedWriterInfo from '@/components/feed/FeedWriterInfo';
import type { Meta, StoryObj, StoryFn } from '@storybook/react';

type StoryComponent = StoryObj<typeof FeedWriterInfo>;
type StoryTemplate = StoryFn<typeof FeedWriterInfo>;

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  component: FeedWriterInfo,
  tags: ['autodocs']
} as Meta<typeof FeedWriterInfo>;

const Template: StoryTemplate = (args) => {
  return <FeedWriterInfo {...args} />;
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
