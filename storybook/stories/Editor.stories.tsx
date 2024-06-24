import type { Meta, StoryObj, StoryFn } from '@storybook/react';
import Editor from '@/components/editor/Editor';

type StoryComponent = StoryObj<typeof Editor>;
type StoryTemplate = StoryFn<typeof Editor>;

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  component: Editor,
  tags: ['autodocs']
} as Meta<typeof Editor>;

const Template: StoryTemplate = (args) => {
  return <Editor {...args} />;
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
    config: {
      mention: {
        list: [
          { name: 'Derek', age: '30' },
          { name: 'Easton', age: '30' }
        ]
      },
      hash: {
        list: [{ name: 'Derek' }, { name: 'Easton' }]
      }
    }
  },
  render: Template
};
