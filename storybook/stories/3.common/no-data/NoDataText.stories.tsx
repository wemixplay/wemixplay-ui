import type { Meta, StoryObj, StoryFn } from '@storybook/react';
import NoDataText from '@/components/noData/NoDataText';

type StoryComponent = StoryObj<typeof NoDataText>;
type StoryTemplate = StoryFn<typeof NoDataText>;

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  component: NoDataText,
  tags: ['autodocs']
} as Meta<typeof NoDataText>;

const Template: StoryTemplate = (args) => {
  return <NoDataText {...args} />;
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
