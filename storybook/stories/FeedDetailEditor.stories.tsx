import type { Meta, StoryObj, StoryFn } from '@storybook/react';
import FeedDetailEditor from '@/components/editor/FeedDetailEditor';

type StoryComponent = StoryObj<typeof FeedDetailEditor>;
type StoryTemplate = StoryFn<typeof FeedDetailEditor>;

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  component: FeedDetailEditor,
  tags: ['autodocs']
} as Meta<typeof FeedDetailEditor>;

const Template: StoryTemplate = (args) => {
  return (
    <div style={{ borderRadius: '12px', boxShadow: '0px 8px 16px 0px rgba(0, 0, 0, 0.12)' }}>
      <FeedDetailEditor {...args} />
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
  args: {
    textValue:
      'awda wawd awd[LINEBREAK]a[LINEBREAK]wd [LINEBREAK]awd[LINEBREAK]aw[LINEBREAK]d[LINEBREAK][LINEBREAK][LINEBREAK]a[LINEBREAK]wdaw awd',
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
          console.log(allHashTag);
        }
      }
    }
  },
  render: Template
};
