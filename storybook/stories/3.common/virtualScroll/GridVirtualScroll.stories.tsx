import type { Meta, StoryObj, StoryFn } from '@storybook/react';
import React, { useCallback, useRef } from 'react';
import GridVirtualScroll from '@/components/virtualScroll/GridVirtualScroll';

type StoryComponent = StoryObj<typeof GridVirtualScroll>;
type StoryTemplate = StoryFn<typeof GridVirtualScroll>;

const LIST = Array.from({ length: 1000 }).map((_, index) => index + 1);

const ExampleItem = ({ item }: { item: number }) => {
  return <div>{item}</div>;
};

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  component: GridVirtualScroll,
  tags: ['autodocs'],
  argTypes: {
    list: {
      control: 'radio',
      options: {
        null: null,
        '[1, 2, ..., 999, 1000]': LIST,
        '[]': []
      },
      defaultValue: LIST
    },
    noDataMsg: {
      control: 'text'
    }
  }
} as Meta<typeof GridVirtualScroll>;

const Template: StoryTemplate = (args) => {
  const { list, ...others } = args;

  const scrollTarget = useRef<HTMLDivElement | null>(null);

  const element = useCallback(({ item }: { item: number }) => {
    return <ExampleItem item={item} />;
  }, []);

  return (
    <div ref={scrollTarget} style={{ height: 500, overflowY: 'scroll' }}>
      <GridVirtualScroll
        {...others}
        scrollTarget={scrollTarget}
        list={LIST}
        itemWidth={(containerWith) => containerWith / 4}
        itemHeight={12}
        gapX={10}
        gapY={10}
        element={element}
      />
    </div>
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
  args: {},
  render: Template
};
