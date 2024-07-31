import FeedTextContent from '@/components/feed/FeedTextContent';
import type { Meta, StoryObj, StoryFn } from '@storybook/react';

type StoryComponent = StoryObj<typeof FeedTextContent>;
type StoryTemplate = StoryFn<typeof FeedTextContent>;

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  component: FeedTextContent,
  tags: ['autodocs']
} as Meta<typeof FeedTextContent>;

const Template: StoryTemplate = (args) => {
  return <FeedTextContent {...args} />;
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
    content: 'WP@[김종완](31) ㅁㅇㅈㅁㅇㅁㅈㅇ'
  },
  render: Template
};
