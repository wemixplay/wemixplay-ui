import Ellipsis from '@/components/ellipsis/Ellipsis';
import type { Meta, StoryObj, StoryFn } from '@storybook/react';

import { useState } from 'react';
import { useEffect } from 'react';

type StoryComponent = StoryObj<typeof Ellipsis>;
type StoryTemplate = StoryFn<typeof Ellipsis>;

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  component: Ellipsis,
  tags: ['autodocs']
} as Meta<typeof Ellipsis>;

const StringContentTemplate: StoryTemplate = (args) => {
  const [change, setChange] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setChange(true);
    }, 10000);
  }, []);

  return (
    <div>
      <Ellipsis
        {...args}
        // content={change ? args.content : 'dasdsd entence appears.'}
        content={args.content}
        onShowMoreLessClick={undefined}
      />
    </div>
  );
};

export const StringContent: StoryComponent = {
  parameters: {
    docs: {
      description: {
        story: ''
      }
    }
  },
  args: {
    className: 'test-box',
    content:
      'For writers, a random sentence can help them get their creative juices flowing. Since the topic of the sentence is completely unknown, it forces the writer to be creative when the sentence appears. There are a number of different ways a writer can use the random sentence for creativity. The most common way to use the sentence is to begin a story. Another option is to include it somewhere in the story. A much more difficult challenge is to use it to end a story. In any of these cases, it forces the writer to think creatively since they have no idea what sentence will appear from the tool.',
    triggerMore: 'show more',
    triggerLess: 'show less',
    lineClamp: 2,
    defaultShortened: false
  },
  render: StringContentTemplate
};

const ReactElementContentTemplate: StoryTemplate = (args) => {
  return (
    <div>
      <Ellipsis {...args} />
    </div>
  );
};

export const ReactElementContent: StoryComponent = {
  parameters: {
    docs: {
      description: {
        story: 'content prop에 리액트 노드를 주입한 Ellipsis 컴포넌트입니다.'
      }
    }
  },
  args: {
    className: 'test-box',
    content: (
      <>
        <h1>For writers, a random sentence can help them get their creative juices flowing.</h1>
        <div>
          Since the topic of the sentence is completely unknown, it forces the writer to be creative
          when the sentence appears. There are a number of different ways a writer can use the
          random sentence for creativity.
        </div>
        <strong>
          The most common way to use the sentence is to begin a story. Another option is to include
          it somewhere in the story. A much more difficult challenge is to use it to end a story.
        </strong>
        <div>
          In any of these cases, it forces the writer to think creatively since they have no idea
          what sentence will appear from the tool.
        </div>
      </>
    ),
    triggerMore: 'show more',
    triggerLess: 'show less',
    lineClamp: 5,
    defaultShortened: true
  },
  render: ReactElementContentTemplate
};
