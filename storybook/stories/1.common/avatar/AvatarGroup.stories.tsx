import type { Meta, StoryObj, StoryFn } from '@storybook/react';
import AvatarGroup from '@/components/avatars/AvatarGroup';

type StoryComponent = StoryObj<typeof AvatarGroup>;
type StoryTemplate = StoryFn<typeof AvatarGroup>;

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  component: AvatarGroup,
  tags: ['autodocs'],
  argTypes: {
    showCnt: {
      control: {
        type: 'range',
        min: 2,
        max: 10,
        defaultValue: 4
      }
    },
    avatarHideRatio: {
      control: {
        type: 'range',
        min: 0.1,
        max: 0.9,
        step: 0.1,
        defaultValue: 0.5
      }
    },
    rotateDuration: {
      control: 'number'
    },
    avatarCustomSize: {
      control: {
        type: 'range',
        min: 0,
        max: 100,
        step: 1,
        defaultValue: 30
      }
    }
  }
} as Meta<typeof AvatarGroup>;

const Template: StoryTemplate = (args) => {
  return <AvatarGroup {...args} />;
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
      '/assets/imgs/@drops-card-sample.png',
      '/assets/imgs/@drops-card-sample.png',
      '/assets/imgs/@drops-card-sample.png',
      '/assets/imgs/@drops-card-sample.png',
      '/assets/imgs/@drops-card-sample.png'
    ],
    showCnt: 4,
    avatarHideRatio: 0.5,
    rotateDuration: 0
  },
  render: Template
};
