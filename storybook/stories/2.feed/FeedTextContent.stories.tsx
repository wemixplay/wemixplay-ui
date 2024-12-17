import FeedTextContent from '@/components/feed/FeedTextContent';
import type { Meta, StoryObj, StoryFn } from '@storybook/react';

type StoryComponent = StoryObj<typeof FeedTextContent>;
type StoryTemplate = StoryFn<typeof FeedTextContent>;

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  component: FeedTextContent,
  tags: ['autodocs']
} as Meta<typeof FeedTextContent>;

const Template: StoryTemplate = (args) => {
  return <FeedTextContent {...args} />;
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
    content:
      '[https://wemixplay.com/nft/detail/0xe69921d540f235b534844b65bbb38aac99ef6036/1000004671](https://wemixplay.com/nft/detail/0xe69921d540f235b534844b65bbb38aac99ef6036/1000004671)[:target=&amp;quot;_blank&amp;quot;] [LINEBREAK][LINEBREAK]Current NFT stats havent updated on wemix yet. Picture shows current stats and with buff and without. WP#[nightcrows](25) WP#[cleric](95) WP#[naeu102](96) WP#[rook](97)'
  },
  render: Template
};
