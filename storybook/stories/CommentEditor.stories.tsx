import type { Meta, StoryObj, StoryFn } from '@storybook/react';
import CommentEditor from '@/components/comment/CommentEditor';

type StoryComponent = StoryObj<typeof CommentEditor>;
type StoryTemplate = StoryFn<typeof CommentEditor>;

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  component: CommentEditor,
  tags: ['autodocs']
} as Meta<typeof CommentEditor>;

const Template: StoryTemplate = (args) => {
  return <CommentEditor {...args} />;
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
