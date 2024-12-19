import type { Meta, StoryObj, StoryFn } from '@storybook/react';
import Tab from '@/components/tab/Tab';
import { makeCxFunc } from '@/utils/forReactUtils';

import style from '../../../styles/ExampleTab.module.scss';

type StoryComponent = StoryObj<typeof Tab>;
type StoryTemplate = StoryFn<typeof Tab>;

const cx = makeCxFunc(style);

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  component: Tab,
  tags: ['autodocs'],
  argTypes: {
    activeKey: {
      control: 'text'
    }
  }
} as Meta<typeof Tab>;

const Template: StoryTemplate = (args) => {
  return <Tab {...args} className={cx(args.className)} />;
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
    className: 'example-tab',
    tabItems: Array.from({ length: 5 }).map((_, index) => ({
      key: (index + 1).toString(),
      label: <div className={cx('example-tab-label')}>{index + 1}</div>,
      children: <div className={cx('example-tab-content')}>{index + 1} 컨텐츠 입니다.</div>,
      disabled: false,
      isHide: false
    }))
  },
  render: Template
};
