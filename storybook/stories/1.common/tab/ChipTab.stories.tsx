import type { Meta, StoryObj, StoryFn } from '@storybook/react';
import ChipTab from '@/components/tab/ChipTab';

type StoryComponent = StoryObj<typeof ChipTab>;
type StoryTemplate = StoryFn<typeof ChipTab>;

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  component: ChipTab,
  tags: ['autodocs']
} as Meta<typeof ChipTab>;

const Template: StoryTemplate = (args) => {
  return <ChipTab {...args} />;
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
    tabItems: Array.from({ length: 5 }).map((_, index) => ({
      key: (index + 1).toString(),
      label: <div>Tabs {index + 1}</div>,
      children: <div>{index + 1} 컨텐츠 입니다.</div>,
      disabled: false,
      isHide: false
    }))
  },
  render: Template
};
