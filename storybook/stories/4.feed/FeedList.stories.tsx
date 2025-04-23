import FeedBox from '@/components/feed/FeedBox';
import type { Meta, StoryObj, StoryFn } from '@storybook/react';

type StoryComponent = StoryObj<typeof FeedBox>;
type StoryTemplate = StoryFn<typeof FeedBox>;

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  component: FeedBox,
  tags: ['autodocs']
} as Meta<typeof FeedBox>;

const Template: StoryTemplate = (args) => {
  return (
    <div>
      <FeedBox
        intersectionVideo
        media={[
          {
            src: 'https://www.youtube.com/embed/bJZhMOQc3JI?autoplay=0&rel=0&controls=1&modestbranding=1&loop=1&enablejsapi=1&origin=https%3A%2F%2Fwemixplay.com&widgetid=1',
            type: 'youtube'
          }
        ]}
      />
      <FeedBox
        intersectionVideo
        media={[
          {
            src: 'https://www.youtube.com/embed/uw2Q_SVmOj4?autoplay=0&rel=0&controls=1&modestbranding=1&loop=1&enablejsapi=1&origin=https%3A%2F%2Fwemixplay.com&widgetid=1',
            type: 'youtube'
          }
        ]}
      />
      <FeedBox
        intersectionVideo
        media={[
          {
            src: 'https://www.youtube.com/embed/4k-OLmtrTm8?autoplay=0&rel=0&controls=1&modestbranding=1&loop=1&enablejsapi=1&origin=https%3A%2F%2Fwemixplay.com&widgetid=1',
            type: 'youtube'
          }
        ]}
      />
      <FeedBox
        intersectionVideo
        media={[
          {
            src: 'https://www.youtube.com/embed/YqPAoCvWVEs?autoplay=0&rel=0&controls=1&modestbranding=1&loop=1&enablejsapi=1&origin=https%3A%2F%2Fwemixplay.com&widgetid=1',
            type: 'youtube'
          }
        ]}
      />
      <FeedBox
        intersectionVideo
        media={[
          {
            src: 'https://www.youtube.com/embed/jO48dgGcKfs?autoplay=0&rel=0&controls=1&modestbranding=1&loop=1&enablejsapi=1&origin=https%3A%2F%2Fwemixplay.com&widgetid=1',
            type: 'youtube'
          }
        ]}
      />
      <FeedBox
        intersectionVideo
        ogMetaData={{
          title: 'title',
          url: 'https://www.google.com',
          description: 'description',
          image:
            'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
        }}
      />
    </div>
  );
};

export const Default: StoryComponent = {
  parameters: {
    docs: {
      description: {
        story: ''
      }
    }
  },
  args: {},
  render: Template
};
