import type { Meta, StoryObj, StoryFn } from '@storybook/react';
import { CSSProperties } from 'react';
import Timer from '@/components/timer/Timer';

type StoryComponent = StoryObj<typeof Timer>;
type StoryTemplate = StoryFn<typeof Timer>;

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  component: Timer,
  tags: ['autodocs'],
  argTypes: {
    saperator: {
      control: {
        type: 'text'
      }
    }
  }
} as Meta<typeof Timer>;

const Template: StoryTemplate = (args) => {
  return (
    <>
      <Timer {...args} />
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
    duration: 6150 + 1000 * 60 * 1,
    saperator: ':',
    useButtons: true,
    pausedElement: 'PAUSE',
    resumedElement: 'RESUME',
    refreshElement: 'REFRESH',
    defaultPaused: true,
    showAllUnits: true
  },
  render: Template
};
