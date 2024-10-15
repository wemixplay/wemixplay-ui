import type { Meta, StoryObj, StoryFn } from '@storybook/react';
import FeedBox from '@/components/feed/FeedBox';

type StoryComponent = StoryObj<typeof FeedBox>;
type StoryTemplate = StoryFn<typeof FeedBox>;

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  component: FeedBox,
  tags: ['autodocs']
} as Meta<typeof FeedBox>;

const Template: StoryTemplate = (args) => {
  return <FeedBox {...args} />;
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
    createdAt: Date.now(),
    locale: 'ko',
    intersectionVideo: true,
    textContent: 'Commit Message',
    images: [
      'https://cdn.pixabay.com/animation/2022/10/11/09/05/09-05-26-529_512.gif',
      'https://cdn-images-1.medium.com/fit/t/1600/480/1*AmI9wRbXrfIWGESx6eEiTw.gif'
    ],
    media: [
      {
        src: 'https://player.twitch.tv/?channel=dyushi&autoplay=false&muted=false&parent=localhost',
        type: 'twitch'
      }
    ]
  },
  render: Template
};
