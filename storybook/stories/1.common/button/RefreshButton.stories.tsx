import type { Meta, StoryObj, StoryFn } from '@storybook/react';
import RefreshButton from '@/components/buttons/RefreshButton';

type StoryComponent = StoryObj<typeof RefreshButton>;
type StoryTemplate = StoryFn<typeof RefreshButton>;

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  component: RefreshButton,
  tags: ['autodocs']
} as Meta<typeof RefreshButton>;

const Template: StoryTemplate = (args) => {
  return (
    <>
      <RefreshButton {...args} />
    </>
  );
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
    duration: 5,
    showCount: true
  },
  render: Template
};
