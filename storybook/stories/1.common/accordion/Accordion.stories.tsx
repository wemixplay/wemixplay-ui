import type { Meta, StoryObj, StoryFn } from '@storybook/react';
import Accordion from '@/components/accordion/Accordion';

type StoryComponent = StoryObj<typeof Accordion>;
type StoryTemplate = StoryFn<typeof Accordion>;

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  component: Accordion,
  tags: ['autodocs'],
  argTypes: {
    borderColor: {
      control: 'color'
    }
  }
} as Meta<typeof Accordion>;

const DefaultTemplate: StoryTemplate = (args) => {
  return <Accordion {...args} />;
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
    title: '테스트 입니다.',
    children: '테스트에 대한 저의 답은 이겁니다!!! 으아아아아아아악!!!'
  },
  render: DefaultTemplate
};
