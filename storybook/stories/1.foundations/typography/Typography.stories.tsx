import type { Meta, StoryObj, StoryFn } from '@storybook/react';
import Typography from '@/components/typography/Typography';

type StoryComponent = StoryObj<typeof Typography>;
type StoryTemplate = StoryFn<typeof Typography>;

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  component: Typography,
  tags: ['autodocs']
} as Meta<typeof Typography>;

const DefaultTemplate: StoryTemplate = (args) => {
  return <Typography {...args} />;
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
    children: 'Typography',
    tag: 'span',
    type: 'display-01-b'
  },
  render: DefaultTemplate
};

export const TypographyH: StoryComponent = {
  parameters: {
    docs: {
      source: {
        code:
          '\n<Typography.H hLevel={1}>' +
          '\n\h태그를 쓸때는 <Typography.H />를 사용하면 됩니다.' +
          '\n</Typography.H>'
      }
    }
  },
  args: {
    children: 'h 태그를 쓸때는 <Typography.H /> 를 사용하면 됩니다.',
    tag: 'h',
    hLevel: 1
  },
  argTypes: {
    tag: {
      control: false
    }
  },
  render: DefaultTemplate
};

export const TypographyP: StoryComponent = {
  parameters: {
    docs: {
      source: {
        code:
          '\n<Typography.P >' +
          '\n\p태그를 쓸때는 <Typography.P />를 사용하면 됩니다.' +
          '\n</Typography.P>'
      }
    }
  },
  args: {
    children: 'p 태그를 쓸때는 <Typography.P />를 사용하면 됩니다.',
    tag: 'p'
  },
  argTypes: {
    tag: {
      control: false
    },
    hLevel: {
      control: false
    }
  },
  render: DefaultTemplate
};

export const TypographySpan: StoryComponent = {
  parameters: {
    docs: {
      source: {
        code:
          '\n<Typography.Span>' +
          '\n\span태그를 쓸때는 <Typography.Span />를 사용하면 됩니다.' +
          '\n</Typography.Span>'
      }
    }
  },
  args: {
    children: 'span 태그를 쓸때는 <Typography.Span />를 사용하면 됩니다.',
    tag: 'span'
  },
  argTypes: {
    tag: {
      control: false
    },
    hLevel: {
      control: false
    }
  },
  render: DefaultTemplate
};

export const TypographyFont: StoryComponent = {
  parameters: {
    docs: {
      source: {
        code:
          '\n<Typography.Font>' +
          '\n\font태그를 쓸때는 <Typography.Font />를 사용하면 됩니다.' +
          '\n</Typography.Font>'
      }
    }
  },
  args: {
    children: 'font 태그를 쓸때는 <Typography.Font />를 사용하면 됩니다.',
    tag: 'font'
  },
  argTypes: {
    tag: {
      control: false
    },
    hLevel: {
      control: false
    }
  },
  render: DefaultTemplate
};

export const TypographyLabel: StoryComponent = {
  parameters: {
    docs: {
      source: {
        code:
          '\n<Typography.Label>' +
          '\n\label태그를 쓸때는 <Typography.Label />를 사용하면 됩니다.' +
          '\n</Typography.Label>'
      }
    }
  },
  args: {
    children: 'label 태그를 쓸때는 <Typography.Label />를 사용하면 됩니다.',
    tag: 'label'
  },
  argTypes: {
    tag: {
      control: false
    },
    hLevel: {
      control: false
    }
  },
  render: DefaultTemplate
};

export const TypographyColor: StoryComponent = {
  parameters: {
    docs: {
      source: {
        code:
          '\n<Typography color="static-white">' +
          '\n\t색상은 이렇게 쓸 수 있습니다.' +
          '\n</Typography>'
      }
    }
  },
  args: {
    children: '색상은 이렇게 쓸 수 있습니다.',
    color: 'accent-purple'
  },
  render: DefaultTemplate
};
