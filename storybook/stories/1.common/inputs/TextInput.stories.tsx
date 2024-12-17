import type { Meta, StoryObj, StoryFn } from '@storybook/react';
import TextInput from '@/components/inputs/textInput/TextInput';

type StoryComponent = StoryObj<typeof TextInput>;
type StoryTemplate = StoryFn<typeof TextInput>;

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  component: TextInput,
  tags: ['autodocs']
} as Meta<typeof TextInput>;

const Template: StoryTemplate = (args) => <TextInput {...args} />;

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
