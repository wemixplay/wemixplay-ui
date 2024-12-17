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
    ],
    ogMetaData: {
      title: '위퍼블릭123',
      url: 'wepublic.com',
      image:
        'https://plus.unsplash.com/premium_photo-1732730224306-3b469ea9e640?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8',
      description:
        'Experience the blockchain game economy offered by WEMIX Play. Experience the blockchain game economy offered by WEMIX Play. Experience the blockchain game economy offered by WEMIX Play. :) Experience the blockchain game economy offered by WEMIX Play. Experience the blockchain game economy offered by WEMIX Play. Experience the blockchain game economy offered by WEMIX Play.'
    }
  },
  render: Template
};
