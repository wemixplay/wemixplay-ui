import FeedEtcInfoArea from '@/components/feed/FeedEtcInfoArea';
import type { Meta, StoryObj, StoryFn } from '@storybook/react';

type StoryComponent = StoryObj<typeof FeedEtcInfoArea>;
type StoryTemplate = StoryFn<typeof FeedEtcInfoArea>;

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  component: FeedEtcInfoArea,
  tags: ['autodocs']
} as Meta<typeof FeedEtcInfoArea>;

const Template: StoryTemplate = (args) => {
  return <FeedEtcInfoArea {...args} />;
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
