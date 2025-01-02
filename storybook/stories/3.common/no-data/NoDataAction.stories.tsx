import type { Meta, StoryObj, StoryFn } from '@storybook/react';
import NoDataAction from '@/components/noData/NoDataAction';

type StoryComponent = StoryObj<typeof NoDataAction>;
type StoryTemplate = StoryFn<typeof NoDataAction>;

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  component: NoDataAction,
  tags: ['autodocs']
} as Meta<typeof NoDataAction>;

const Template: StoryTemplate = (args) => {
  return <NoDataAction {...args} />;
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
