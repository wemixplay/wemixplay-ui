import type { Meta, StoryObj, StoryFn } from '@storybook/react';
import CommentEditor from '@/components/comment/CommentEditor';

type StoryComponent = StoryObj<typeof CommentEditor>;
type StoryTemplate = StoryFn<typeof CommentEditor>;

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  component: CommentEditor,
  tags: ['autodocs']
} as Meta<typeof CommentEditor>;

const Template: StoryTemplate = (args) => {
  return <CommentEditor {...args} />;
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
    maxLength: 1000,
    placeholder: `댓글을 작성해주세요.
과도한 욕설 등 타인에게 불쾌감을 줄 수 있는 의견은 자제해 주세요.
- 최대 일 50건 등록할 수 있습니다.
- 허위사실 유포는 관련 법률에 의해 처벌받을 수 있습니다. `,
    config: {
      mention: {
        list: [
          { id: 1, name: 'Easton' },
          { id: 2, name: 'Derek' },
          { id: 3, name: 'Easton' },
          { id: 4, name: 'Easton' },
          { id: 5, name: 'Easton' },
          { id: 6, name: 'Easton' },
          { id: 7, name: 'Easton' }
        ]
      },
      hash: {
        list: [
          { id: 1, name: 'Derek' },
          { id: 2, name: 'Easton' },
          { id: 3, name: 'Easton' },
          { id: 4, name: 'Easton' },
          { id: 5, name: 'Easton' },
          { id: 6, name: 'Easton' },
          { id: 7, name: 'Easton' }
        ],
        onCompleteHash({ allHashTag, currentHashTag }) {
          // console.log(allHashTag);
        }
      }
    }
  },
  render: Template
};
