import type { Meta, StoryObj, StoryFn } from '@storybook/react';
import AccordionGroup from '@/components/accordion/AccordionGroup';

type StoryComponent = StoryObj<typeof AccordionGroup>;
type StoryTemplate = StoryFn<typeof AccordionGroup>;

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  component: AccordionGroup,
  tags: ['autodocs']
} as Meta<typeof AccordionGroup>;

const Template: StoryTemplate = (args) => {
  return <AccordionGroup {...args} />;
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
    list: [
      {
        title: '테스트 입니다.',
        children: '테스트에 대한 저의 답은 이겁니다!!! 으아아아아아아악!!!'
      },
      {
        title: '테스트 입니다.',
        children: '테스트에 대한 저의 답은 이겁니다!!! 으아아아아아아악!!!'
      },
      {
        title: '테스트 입니다.',
        children: '테스트에 대한 저의 답은 이겁니다!!! 으아아아아아아악!!!'
      },
      {
        title: '테스트 입니다.',
        children: '테스트에 대한 저의 답은 이겁니다!!! 으아아아아아아악!!!'
      }
    ]
  },
  render: Template
};
