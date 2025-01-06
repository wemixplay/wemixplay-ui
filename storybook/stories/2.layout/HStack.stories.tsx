import type { Meta, StoryObj, StoryFn } from '@storybook/react';
import HStack from '@/components/layouts/HStack';
import { ReactNode } from 'react';
import { contentOptions, itemsOptions, selfOptions } from './constants';

type StoryComponent = StoryObj<typeof HStack>;
type StoryTemplate = StoryFn<typeof HStack>;
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  component: HStack,
  tags: ['autodocs'],
  argTypes: {
    justifyContent: {
      control: 'select',
      options: contentOptions
    },
    justifyItems: {
      control: 'select',
      options: itemsOptions
    },
    justifySelf: {
      control: 'select',
      options: selfOptions
    },
    alignItems: {
      control: 'select',
      options: itemsOptions
    },
    alignContent: {
      control: 'select',
      options: contentOptions
    },
    alignSelf: {
      control: 'select',
      options: selfOptions
    },
    columnGap: {
      control: { type: 'range', min: 0, max: 500 }
    },
    rowGap: {
      control: { type: 'range', min: 0, max: 500 }
    }
  }
} as Meta<typeof HStack>;

const Box = ({ children }: { children: ReactNode }) => {
  return (
    <HStack
      justifyContent="center"
      alignItems="center"
      style={{
        width: '100px',
        height: '100px',
        backgroundColor: 'gray',
        color: 'var(--wp-semantic-label-normal)'
      }}
    >
      {children}
    </HStack>
  );
};

const Template: StoryTemplate = (args) => {
  return (
    <HStack {...args}>
      <Box>1</Box>
      <Box>2</Box>
      <Box>3</Box>
    </HStack>
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
    columnGap: 10
  },
  render: Template
};
