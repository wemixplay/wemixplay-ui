import type { Meta, StoryObj, StoryFn } from '@storybook/react';
import NoDataIconText from '@/components/noData/NoDataIconText';

type StoryComponent = StoryObj<typeof NoDataIconText>;
type StoryTemplate = StoryFn<typeof NoDataIconText>;

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  component: NoDataIconText,
  tags: ['autodocs']
} as Meta<typeof NoDataIconText>;

const Template: StoryTemplate = (args) => {
  return <NoDataIconText {...args} />;
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
