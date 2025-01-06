import type { Meta, StoryObj, StoryFn } from '@storybook/react';
import Divider from '@/components/divider/Divider';

type StoryComponent = StoryObj<typeof Divider>;
type StoryTemplate = StoryFn<typeof Divider>;

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  component: Divider,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: ['horizontal', 'vertical']
      }
    },
    variant: {
      control: {
        type: 'select',
        options: ['dashed', 'dotted', 'solid']
      }
    },
    color: {
      control: {
        type: 'color'
      }
    },
    size: {
      control: {
        type: 'number'
      }
    },
    spaceSize: {
      control: {
        type: 'number'
      }
    },
    spaceDirection: {
      control: {
        type: 'select',
        options: ['top', 'bottom', 'left', 'right', 'both']
      }
    },
    contentSpace: {
      control: {
        type: 'number'
      }
    },
    contentAlign: {
      control: {
        type: 'select',
        options: ['left', 'right', 'center']
      }
    },
    contentPosition: {
      control: {
        type: 'number'
      }
    },
    children: {
      control: {
        type: 'text'
      }
    }
  }
} as Meta<typeof Divider>;

const Template: StoryTemplate = (args) => {
  return (
    <div
      style={{
        display: args.type === 'vertical' ? 'flex' : 'block',
        color: 'var(--wp-semantic-label-normal)'
      }}
    >
      <p style={{ margin: '0' }}>Section1</p>
      <Divider {...args} />
      <p style={{ margin: '0' }}>Section2</p>
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
    spaceSize: 10
  },
  render: Template
};
