import CommentEtcInfo from '@/components/comment/CommentEtcInfo';
import type { Meta, StoryObj, StoryFn } from '@storybook/react';

type StoryComponent = StoryObj<typeof CommentEtcInfo>;
type StoryTemplate = StoryFn<typeof CommentEtcInfo>;

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  component: CommentEtcInfo,
  tags: ['autodocs']
} as Meta<typeof CommentEtcInfo>;

const Template: StoryTemplate = (args) => {
  return <CommentEtcInfo {...args} />;
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
