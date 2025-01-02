import type { Meta, StoryObj, StoryFn } from '@storybook/react';
import NoImage from '@/components/noData/NoImage';

type StoryComponent = StoryObj<typeof NoImage>;
type StoryTemplate = StoryFn<typeof NoImage>;

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  component: NoImage,
  tags: ['autodocs']
} as Meta<typeof NoImage>;

const Template: StoryTemplate = (args) => {
  return (
    <div style={{ position: 'relative', width: '100px', height: '100px' }}>
      <NoImage {...args} />
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
