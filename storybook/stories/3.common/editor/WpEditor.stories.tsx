import type { Meta, StoryObj, StoryFn } from '@storybook/react';
import WpEditor from '@/components/editor/WpEditor';

type StoryComponent = StoryObj<typeof WpEditor>;
type StoryTemplate = StoryFn<typeof WpEditor>;

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  component: WpEditor,
  tags: ['autodocs']
} as Meta<typeof WpEditor>;

const Template: StoryTemplate = (args) => {
  return <WpEditor {...args} maxLength={20} />;
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
