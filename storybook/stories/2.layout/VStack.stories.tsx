import type { Meta, StoryObj, StoryFn } from '@storybook/react';
import VStack from '@/components/layouts/VStack';
import { ReactNode } from 'react';
import { itemsOptions, selfOptions } from './constants';
import { contentOptions } from './constants';

type StoryComponent = StoryObj<typeof VStack>;
type StoryTemplate = StoryFn<typeof VStack>;

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  component: VStack,
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
} as Meta<typeof VStack>;

const Box = ({ children }: { children: ReactNode }) => {
  return (
    <VStack
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
    </VStack>
  );
};

const Template: StoryTemplate = (args) => {
  return (
    <VStack {...args}>
      <Box>1</Box>
      <Box>2</Box>
      <Box>3</Box>
    </VStack>
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
    rowGap: 10
  },
  render: Template
};
