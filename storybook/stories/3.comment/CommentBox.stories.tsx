import type { Meta, StoryObj, StoryFn } from '@storybook/react';
import CommentBox from '@/components/comment/CommentBox';

type StoryComponent = StoryObj<typeof CommentBox>;
type StoryTemplate = StoryFn<typeof CommentBox>;

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  component: CommentBox,
  tags: ['autodocs']
} as Meta<typeof CommentBox>;

const Template: StoryTemplate = (args) => {
  return <CommentBox {...args} />;
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
