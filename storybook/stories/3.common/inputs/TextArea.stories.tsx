import type { Meta, StoryObj, StoryFn } from '@storybook/react';
import TextArea, { TextAreaProps } from '@/components/inputs/textarea/TextArea';

type StoryComponent = StoryObj<typeof TextArea>;
type StoryTemplate = StoryFn<typeof TextArea>;

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  component: TextArea,
  tags: ['autodocs']
} as Meta<typeof TextArea>;

const Template: StoryTemplate = (args) => {
  return <TextArea {...args} />;
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
