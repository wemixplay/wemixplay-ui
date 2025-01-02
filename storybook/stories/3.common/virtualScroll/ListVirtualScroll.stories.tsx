import type { Meta, StoryObj, StoryFn } from '@storybook/react';
import React, { useRef, useCallback } from 'react';
import ListVirtualScroll from '@/components/virtualScroll/ListVirtualScroll';

type StoryComponent = StoryObj<typeof ListVirtualScroll>;
type StoryTemplate = StoryFn<typeof ListVirtualScroll>;

const LIST = Array.from({ length: 1000 }).map((_, index) => index + 1);

const ExampleItem = ({ item }: { item: number }) => {
  return <div>{item}</div>;
};

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  component: ListVirtualScroll,
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
} as Meta<typeof ListVirtualScroll>;

const Template: StoryTemplate = (args) => {
  const { list, ...others } = args;

  const scrollTarget = useRef<HTMLDivElement | null>(null);

  const element = useCallback(({ item }: { item: number }) => {
    return <ExampleItem item={item} />;
  }, []);

  return (
    <div ref={scrollTarget} style={{ height: 500, overflowY: 'scroll' }}>
      <ListVirtualScroll
        {...others}
        scrollTarget={scrollTarget}
        list={LIST}
        itemHeight={11}
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
