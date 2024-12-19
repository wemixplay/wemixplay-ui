import type { Meta, StoryObj, StoryFn } from '@storybook/react';
import ListMap from '@/components/list/ListMap';
import { makeCxFunc } from '@/utils/forReactUtils';

import style from '../../../styles/ExampleList.module.scss';

const cx = makeCxFunc(style);

type StoryComponent = StoryObj<typeof ListMap>;
type StoryTemplate = StoryFn<typeof ListMap>;

const SkeletonExampleItem = ({}) => {
  return <div className={cx('item', 'skeleton')}></div>;
};

const ExampleItem = ({ item }: { item: number }) => {
  return <div className={cx('item')}>{item}</div>;
};

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  component: ListMap,
  tags: ['autodocs'],
  argTypes: {
    list: {
      control: 'radio',
      options: {
        null: null,
        '[1, 2, 3, 4, 5, 6]': [1, 2, 3, 4, 5, 6],
        '[]': []
      },
      defaultValue: [1, 2, 3, 4, 5, 6]
    },
    noDataMsg: {
      control: 'text'
    },
    skeletonElement: {
      control: 'radio',
      options: {
        '값 없음': undefined,
        '<SkeletonExampleItem />': <SkeletonExampleItem />
      }
    },
    skeletonCnt: {
      description: '노출시킬 스켈레톤 컴포넌트의 갯수\n\n',
      control: {
        type: 'number',
        min: 1
      }
    }
  }
} as Meta<typeof ListMap>;

const Template: StoryTemplate = (args) => {
  const { list: argsList, ...others } = args;
  const list = argsList as number[] | null;

  return (
    <div className={cx('list', 'example-list', { empty: list && list.length === 0 })}>
      <ListMap {...others} list={list}>
        {({ item, index }) => <ExampleItem key={index} item={item as number} />}
      </ListMap>
    </div>
  );
};

export const Default: StoryComponent = {
  parameters: {
    docs: {
      source: {
        code:
          'interface  PropsType {' +
          '\n\tlist: number[] | null;' +
          '\n}' +
          '\n\n' +
          '\n// list에는 배열이나 null 값이 올 수 있으며 children을 함수로 반환한다.' +
          '\n// children 함수의 전달인자는 첫번째는 list의 요소, 두번째는 배열의 index 값이다.' +
          '\n// (list 요소의 타입은 자동으로 추론된다)' +
          '\n' +
          '\nconst ExampleList = ({ list }: PropsType) => {' +
          '\n\treturn (' +
          '\n\t\t<div className="exmaple-list">' +
          '\n\t\t\t<ListMap list={list}>' +
          '\n\t\t\t\t{ ({ item, index }) => (<ExampleItem key={index} item={item} />) }' +
          '\n\t\t\t</ListMap>' +
          '\n\t\t</div>' +
          '\n\t)' +
          '\n}'
      },
      description: {
        story: ''
      }
    }
  },
  args: {
    list: [1, 2, 3, 4, 5, 6]
  },
  render: Template
};
