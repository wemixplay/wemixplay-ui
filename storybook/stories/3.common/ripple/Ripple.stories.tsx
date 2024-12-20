import Ripple from '@/components/ripple/Ripple';
import type { Meta, StoryObj, StoryFn } from '@storybook/react';

type StoryComponent = StoryObj<typeof Ripple>;
type StoryTemplate = StoryFn<typeof Ripple>;

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  component: Ripple,
  tags: ['autodocs']
} as Meta<typeof Ripple>;

const Template: StoryTemplate = (args) => {
  return (
    <Ripple {...args}>
      <button style={{ padding: '10px 20px' }}>Click</button>
    </Ripple>
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
    color: '#432525'
  },
  render: Template
};
