import type { Meta, StoryObj, StoryFn } from '@storybook/react';
import React, { useState, useEffect, useMemo } from 'react';
import InfiniteScroll from '@/components/list/InfiniteScroll';
import { wait } from '@/utils/etcUtils';

type StoryComponent = StoryObj<typeof InfiniteScroll>;
type StoryTemplate = StoryFn<typeof InfiniteScroll>;

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  component: InfiniteScroll,
  tags: ['autodocs']
} as Meta<typeof InfiniteScroll>;

const Template: StoryTemplate = (args) => {
  const [list, setList] = useState<number[]>([]);
  const [offset, setOffset] = useState(1);
  const [loading, setLoading] = useState(false);

  const allList = useMemo(() => {
    return Array.from({ length: args.totalCount as number }).map((_, index) => index + 1);
  }, [args.totalCount]);

  const handleLoadMore = async () => {
    setLoading(true);
    await wait(1000);
    const newOffset = offset + 1;

    setList(allList.slice(0, 30 * newOffset));
    setOffset(newOffset);

    args.handleLoadMore();

    setLoading(false);
  };

  useEffect(() => {
    setList(allList.slice(0, 30));
  }, [allList]);

  return (
    <div style={{ overflowY: 'scroll', maxHeight: 300, border: '1px solid #ddd' }}>
      <InfiniteScroll
        {...args}
        list={list}
        loading={loading && args.loading}
        handleLoadMore={handleLoadMore}
      >
        <ul>
          {(list ?? []).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </InfiniteScroll>
    </div>
  );
};

export const Default: StoryComponent = {
  parameters: {
    docs: {
      source: {
        code:
          '\nconst TEST_LIST = Array.from({ length: 100 }).map((_, index) => index + 1);' +
          '\n' +
          '\nconst ExampleInfiniteScroll = () => {' +
          '\n\tconst [list, setList] = useState<number[]>([]);' +
          '\n\tconst [offset, setOffset] = useState(1);' +
          '\n\t' +
          '\n\tconst handleLoadMore = async () => {' +
          '\n\t\tawait wait(1000);' +
          '\n\t\tconst newOffset = offset + 1;' +
          '\n\t\t' +
          '\n\t\tsetList(TEST_LIST.slice(0, 30 * newOffset));' +
          '\n\t\tsetOffset(newOffset);' +
          '\n\t};' +
          '\n\t' +
          '\n\tuseEffect(() => {' +
          '\n\t\tsetList(TEST_LIST.slice(0, 30));' +
          '\n\t}, []);' +
          '\n\t' +
          '\n\treturn (' +
          "\n\t\t<div style={{ overflowY: 'scroll', maxHeight: 300, border: '1px solid #ddd' }}>" +
          '\n\t\t\t<InfiniteScroll' +
          '\n\t\t\t  list={list}' +
          '\n\t\t\t  totalCount={TEST_LIST.length}' +
          '\n\t\t\t  handleLoadMore={handleLoadMore}' +
          '\n\t\t\t>' +
          '\n\t\t\t    <ul>' +
          '\n\t\t\t       {(list ?? []).map((item) => (' +
          '\n\t\t\t          <li key={item}>{item}</li>' +
          '\n\t\t\t       ))}' +
          '\n\t\t\t    </ul>' +
          '\n\t\t\t</InfiniteScroll>' +
          '\n\t\t</div>' +
          '\n\t);' +
          '\n}'
      },
      description: {
        story: ''
      }
    }
  },
  args: {
    scrollTarget: document.body,
    totalCount: 100
  },
  argTypes: {
    list: { control: false },
    children: { control: false }
  },
  render: Template
};
