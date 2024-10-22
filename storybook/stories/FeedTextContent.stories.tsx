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
      // '[PLAY Token Trading on PNIX DEX][LINEBREAK]We&rsquo;re also excited to announce that PLAY Tokens will soon be listed on PNIX DEX, a decentralized exchange (DEX) operating on an order book system. This new market will allow users to freely trade PLAY Tokens, giving you the flexibility to buy and sell tokens directly on the platform.[LINEBREAK][LINEBREAK]Trading on PNIX DEX will officially launch on October 24th, alongside the release of the exclusive PLAY Token packages in the NIGHT CROWS Webshop. However, please be aware that the schedule may be adjusted depending on internal developments.[LINEBREAK][LINEBREAK]Get ready for fast and easy trading of PLAY Tokens on PNIX DEX![LINEBREAK][LINEBREAK]| no | game       | user    | %   |[LINEBREAK]|----|------------|---------|-----|[LINEBREAK]| 1  | nightCrows | 300,023 | 2%  |[LINEBREAK]| 2  | mir4       | 180,232 | 3%  |[LINEBREAK]| 3  | everyfarm  | 19,322  | -5% |[LINEBREAK]We&rsquo;ve also prepared several events where you can earn additional PLAY Tokens, so don&rsquo;t miss out on your chance to participate and enjoy the perks of being a PLAY Token holder![LINEBREAK][LINEBREAK]As always, thank you for being part of the WEMIX community![LINEBREAK][LINEBREAK][LINK][LINEBREAK]&bull; REFLECT Service and Exchange of REFLECT with PLAY Token :[LINEBREAK][https://www.wemix.com/communication/additional-update-reflect-service-and-exchange-of-reflect-with-play-token-835886459208](https://www.wemix.com/communication/additional-update-reflect-service-and-exchange-of-reflect-with-play-token-835886459208)[:target=&quot;_blank&quot;][LINEBREAK]&bull; PNIX DEX : [https://pnix.exchange/](https://pnix.exchange/)[:target=&quot;_blank&quot;] [LINEBREAK][LINEBREAK]WP#[WEMIX](1) WP#[PLAYToken](7) WP#[NIGHTCROWS](25)'
      'wemixplay 인기 순위 [LINEBREAK] | no | game       | user    | %   |[LINEBREAK]|----|------------|---------|-----|[LINEBREAK]| 1  | ![](https://cache.wemixplay.com/WEMIXPLAY-RENEWAL/assets/png/token-icon/crow-type01.png)  NightCrows | 300,023 | 2%  |[LINEBREAK]| 2  | ![](https://cache.wemixplay.com/WEMIXPLAY-RENEWAL/assets/png/token-icon/hydra-type01.png) Mir4       | 180,232 | 3%  |[LINEBREAK]| 3  | ![](https://cache.wemixplay.com/WEMIXPLAY-RENEWAL/assets/png/token-icon/play-type01.png)  playToken  | 19,322  | -5% |'
  },
  render: Template
};
