import FeedEmojiArea from '@/components/feed/FeedEmojiArea';
import type { Meta, StoryObj, StoryFn } from '@storybook/react';

type StoryComponent = StoryObj<typeof FeedEmojiArea>;
type StoryTemplate = StoryFn<typeof FeedEmojiArea>;

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  component: FeedEmojiArea,
  tags: ['autodocs']
} as Meta<typeof FeedEmojiArea>;

const Template: StoryTemplate = (args) => {
  return <FeedEmojiArea {...args} />;
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
    emojiList: [
      {
        imageNo: 1,
        imageUrl:
          'https://emojiisland.com/cdn/shop/products/Emoji_Icon_-_Sunglasses_cool_emoji_large.png?v=1571606093'
      }
    ]
  },
  render: Template
};
