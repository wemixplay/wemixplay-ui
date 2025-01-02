import type { Meta, StoryObj, StoryFn } from '@storybook/react';
import Counter from '@/components/counter/Counter';

type StoryComponent = StoryObj<typeof Counter>;
type StoryTemplate = StoryFn<typeof Counter>;

export default {
  component: Counter,
  tags: ['autodocs']
} as Meta<typeof Counter>;

const Template: StoryTemplate = (args) => {
  return <Counter {...args} />;
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
    endValue: 4136.125,
    startValue: 0,
    duration: 2000,
    delay: 2000,
    separator: true,
    countOnIntersected: true,
    digits: 2,
    iterationCount: 1,
    pause: false
  },
  render: Template
};

const CountOnIntersectedTemplate: StoryTemplate = (args) => {
  return (
    <div style={{ height: '2000px' }}>
      <h1>스크롤을 아래로 내려주세요.</h1>
      <div style={{ height: '1900px' }} />
      <Counter {...args} />
    </div>
  );
};

export const CountOnIntersected: StoryComponent = {
  parameters: {
    docs: {
      description: {
        story:
          '화면 로드 시 카운터 컴포넌트가 뷰포트 아래에 있고 startOnIntersected prop을 true로 설정하면 뷰포트가 카운터 컴포넌트를 보여주는 시점에 카운터를 작동시킵니다.'
      }
    }
  },
  args: {
    endValue: 4136.125,
    startValue: 0,
    duration: 2000,
    delay: 300,
    separator: true,
    countOnIntersected: true,
    digits: 2,
    iterationCount: 1,
    pause: false
  },
  render: CountOnIntersectedTemplate
};
