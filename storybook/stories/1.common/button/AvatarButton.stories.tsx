import type { Meta, StoryObj, StoryFn } from '@storybook/react';
import AvatarButton from '@/components/buttons/AvatarButton';

type StoryComponent = StoryObj<typeof AvatarButton>;
type StoryTemplate = StoryFn<typeof AvatarButton>;

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  component: AvatarButton,
  tags: ['autodocs']
} as Meta<typeof AvatarButton>;

const Template: StoryTemplate = (args) => {
  return <AvatarButton {...args} />;
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
    size: 'small'
  },
  render: Template
};
