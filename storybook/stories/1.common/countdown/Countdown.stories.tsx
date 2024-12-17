import type { Meta, StoryObj, StoryFn } from '@storybook/react';
import Countdown from '@/components/countdown/Countdown';

type StoryComponent = StoryObj<typeof Countdown>;
type StoryTemplate = StoryFn<typeof Countdown>;

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  component: Countdown,
  tags: ['autodocs'],
  argTypes: {
    endTimestamp: {
      control: {
        type: 'date'
      }
    },
    saperator: {
      control: {
        type: 'text'
      }
    }
  }
} as Meta<typeof Countdown>;

const Template: StoryTemplate = (args) => {
  return (
    <>
      <Countdown {...args} />
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
    endTimestamp: Date.now() + 5000,
    saperator: ':',
    showAllUnits: true,
    suffix: {
      days: 'd',
      hours: 'hr',
      minutes: 'mn',
      seconds: 'sc'
    }
  },
  render: Template
};
