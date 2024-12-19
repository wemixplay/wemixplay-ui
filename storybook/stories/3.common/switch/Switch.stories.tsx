import type { Meta, StoryObj, StoryFn } from '@storybook/react';
import Switch from '@/components/switch/Switch';

type StoryComponent = StoryObj<typeof Switch>;
type StoryTemplate = StoryFn<typeof Switch>;

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  component: Switch,
  tags: ['autodocs']
} as Meta<typeof Switch>;

const Template: StoryTemplate = (args) => {
  return (
    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
      <Switch {...args} />

      <Switch {...args} size={'small'} />
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
    name: 'checked',
    // checkedContent: <strong>예</strong>,
    // unCheckedContent: <strong>아니오</strong>,
    readOnly: false,
    disabled: false
  },
  render: Template
};

const LoadingSwitchTemplate: StoryTemplate = (args) => {
  return (
    <>
      <Switch {...args} />
    </>
  );
};

export const LoadingSwitch: StoryComponent = {
  parameters: {
    docs: {
      description: {
        story: ''
      }
    }
  },
  args: {
    readOnly: false,
    disabled: false
  },
  render: LoadingSwitchTemplate
};
