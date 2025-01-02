import type { Meta, StoryObj, StoryFn } from '@storybook/react';
import Button from '@/components/buttons/Button';

type StoryComponent = StoryObj<typeof Button>;
type StoryTemplate = StoryFn<typeof Button>;

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  component: Button,
  tags: ['autodocs'],
  parameters: {
    // nextjs: {
    // appDirectory: true
    // }
  },
  argTypes: {
    target: {
      control: 'text'
    },
    children: {
      table: {
        disable: true
      }
    }
  }
} as Meta<typeof Button>;

const Template: StoryTemplate = (args) => {
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Button {...args} size="large">
          Large
        </Button>
        <Button {...args} size={'medium'}>
          Medium
        </Button>
        <Button {...args} size={'small'}>
          Small
        </Button>

        <Button {...args} size={'small'} disabled={true}>
          Small
        </Button>
      </div>
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
    // nextjs: {
    // appDirectory: true
    // }
  },
  args: {},
  render: Template
};
