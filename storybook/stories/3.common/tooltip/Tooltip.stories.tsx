import type { Meta, StoryObj, StoryFn } from '@storybook/react';
import { useEffect, useId } from 'react';
import DarkTooltip from '@/components/tooltip/DarkTooltip';
import Tooltip from '@/components/tooltip/Tooltip';

type StoryComponent = StoryObj<typeof Tooltip>;
type StoryTemplate = StoryFn<typeof Tooltip>;

let count = 0;

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  component: Tooltip,
  tags: ['autodocs'],
  argTypes: {
    place: {
      control: 'radio',
      options: {
        top: 'top',
        left: 'left',
        bottom: 'bottom',
        right: 'right'
      },
      defaultValue: 'bottom'
    },
    tooltipColor: {
      control: 'color'
    },
    tooltipTextColor: {
      control: 'color'
    }
  },
  parameters: {
    // nextjs: {
    // appDirectory: true
    // }
  }
} as Meta<typeof Tooltip>;

const Template: StoryTemplate = (args) => {
  useEffect(() => {
    count++;
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '200px 0' }}>
      <button id={`${args.anchorId}${count}`}>테스트란?</button>
      <Tooltip {...args} anchorId={`${args.anchorId}${count}`} />
    </div>
  );
};

const DarkTemplate: StoryTemplate = (args) => {
  return (
    <div style={{ textAlign: 'center', padding: '200px 0' }}>
      <button id="test2">테스트란?</button>
      <DarkTooltip {...args}>
        테스트란 음... 너무 어렵죠... 제일 싫어해요... 하지만 필요하죠....
      </DarkTooltip>
    </div>
  );
};

export const Default: StoryComponent = {
  parameters: {
    // nextjs: {
    // appDirectory: true
    // }
  },
  args: {
    anchorId: 'test1',
    events: ['click', 'hover'],
    place: 'top',
    children: '테스트란 음... 너무 어렵죠... 제일 싫어해요... 하지만 필요하죠....'
  },
  render: Template
};

export const DarkTooltipComponent: StoryComponent = {
  parameters: {
    // nextjs: {
    // appDirectory: true
    // }
  },
  args: {
    anchorId: 'test2',
    events: ['click', 'hover'],
    place: 'top',
    children: '테스트란 음... 너무 어렵죠... 제일 싫어해요... 하지만 필요하죠....'
  },
  render: DarkTemplate
};
