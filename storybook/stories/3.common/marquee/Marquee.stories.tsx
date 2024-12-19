import type { Meta, StoryObj, StoryFn } from '@storybook/react';
import { CSSProperties } from 'react';
import Marquee from '@/components/marquee/Marquee';

type StoryComponent = StoryObj<typeof Marquee>;
type StoryTemplate = StoryFn<typeof Marquee>;

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  component: Marquee,
  tags: ['autodocs']
} as Meta<typeof Marquee>;

const marqueeBoxStyle: CSSProperties = {
  width: '300px',
  height: '300px',
  border: '1px solid',
  overflow: 'hidden'
};

const MarqueeChildrenTemplate: StoryTemplate = ({ list, ...args }) => {
  return (
    <div style={marqueeBoxStyle}>
      <Marquee {...args}>
        <span>야호1</span>
        <span>야호2</span>
        <span>야호3</span>
      </Marquee>
    </div>
  );
};

export const MarqueeChildren: StoryComponent = {
  parameters: {
    docs: {
      description: {
        story: ''
      }
    }
  },
  args: {
    direction: 'left',
    off: false,
    pauseOnMouseEnter: true,
    minimalAuto: true,
    spaceBetween: 10,
    animationIterationCount: 'infinite',
    animationDuration: '10s',
    animationDelay: '0s'
  },
  render: MarqueeChildrenTemplate
};

const MarqueeListTemplate: StoryTemplate = (args) => {
  return (
    <div style={marqueeBoxStyle}>
      <Marquee {...args} />
    </div>
  );
};

export const MarqueeList: StoryComponent = {
  parameters: {
    docs: {
      description: {
        story: ''
      }
    }
  },
  args: {
    direction: 'right',
    off: false,
    pauseOnMouseEnter: true,
    minimalAuto: true,
    spaceBetween: 18,
    animationIterationCount: 'infinite',
    animationDuration: '10s',
    animationDelay: '0s',
    list: [
      <span key={1}>야호1</span>,
      <span key={2}>야호2</span>,
      <span key={3}>야호3</span>,
      <span key={4}>야호4</span>
    ]
  },
  render: MarqueeListTemplate
};
