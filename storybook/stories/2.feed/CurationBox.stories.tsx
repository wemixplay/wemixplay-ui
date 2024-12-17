import type { Meta, StoryObj, StoryFn } from '@storybook/react';
import CurationBox from '@/components/feed/CurationBox';

type StoryComponent = StoryObj<typeof CurationBox>;
type StoryTemplate = StoryFn<typeof CurationBox>;

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  component: CurationBox,
  tags: ['autodocs']
} as Meta<typeof CurationBox>;

const Template: StoryTemplate = (args) => {
  return <CurationBox {...args} />;
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
    textContent: 'Commit Message'
  },
  render: Template
};
