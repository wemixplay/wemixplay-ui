import type { Meta, StoryObj, StoryFn } from '@storybook/react';
import CommentWriterInfo from '@/components/comment/CommentWriterInfo';

type StoryComponent = StoryObj<typeof CommentWriterInfo>;
type StoryTemplate = StoryFn<typeof CommentWriterInfo>;

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  component: CommentWriterInfo,
  tags: ['autodocs']
} as Meta<typeof CommentWriterInfo>;

const Template: StoryTemplate = (args) => {
  return <CommentWriterInfo {...args} />;
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
    writerName: '김또깡'
  },
  render: Template
};
