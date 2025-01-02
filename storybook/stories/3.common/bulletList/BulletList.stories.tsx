import type { Meta, StoryObj, StoryFn } from '@storybook/react';
import BulletList from '@/components/bulletList/BulletList';

type StoryComponent = StoryObj<typeof BulletList>;
type StoryTemplate = StoryFn<typeof BulletList>;

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  component: BulletList,
  tags: ['autodocs']
} as Meta<typeof BulletList>;

const Template: StoryTemplate = (args) => {
  return <BulletList {...args} />;
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
    list: ['1 입니다.', '2 입니다.', '3 입니다.', '4 입니다.', '5 입니다.'],
    bulletIcon: '*',
    bulletGap: '1.5em',
    bulletIconPosition: {
      top: 3
    }
  },
  render: Template
};
