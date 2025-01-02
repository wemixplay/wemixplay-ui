import type { Meta, StoryObj, StoryFn } from '@storybook/react';
import Table from '@/components/table/Table';
import Spinner from '@/components/loadings/Spinner';
import TableRow from '@/components/table/TableRow';
import TdColumn from '@/components/table/TdColumn';

type StoryComponent = StoryObj<typeof Table>;
type StoryTemplate = StoryFn<typeof Table>;

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  component: Table,
  tags: ['autodocs'],
  argTypes: {
    list: {
      control: 'radio',
      options: {
        '웹개발1팀 정보': [
          { name: '김정석', nickname: 'Simon', gender: 'man', position: 'Leader' },
          { name: '정형근', nickname: 'Larry', gender: 'man', position: 'Member' },
          { name: '이동재', nickname: 'James', gender: 'man', position: 'Member' },
          { name: '송현영', nickname: 'Sonny', gender: 'man', position: 'Member' },
          { name: '김종완', nickname: 'Derek', gender: 'man', position: 'Member' },
          { name: '정도영', nickname: 'Jack', gender: 'man', position: 'Member' }
        ],
        '[]': [],
        null: null
      },
      defaultValue: [
        { name: '김정석', nickname: 'Simon', gender: 'man', position: 'Leader' },
        { name: '정형근', nickname: 'Larry', gender: 'man', position: 'Member' },
        { name: '이동재', nickname: 'James', gender: 'man', position: 'Member' },
        { name: '송현영', nickname: 'Sonny', gender: 'man', position: 'Member' },
        { name: '김종완', nickname: 'Derek', gender: 'man', position: 'Member' },
        { name: '정도영', nickname: 'Jack', gender: 'man', position: 'Member' }
      ]
    },
    noDataMsg: {
      control: 'text'
    },
    loadingElement: {
      control: 'radio',
      options: {
        '<Spinner />': <Spinner />
      }
    }
  }
} as Meta<typeof Table>;

const Template: StoryTemplate = (args) => {
  return (
    <Table {...args}>
      {({ item, index }) => (
        <TableRow key={`tr-${item.id ?? index}`}>
          <TdColumn fieldId="nameText" label="이름" size={130} sortValue={item.name}>
            <span>{item.name}</span>
          </TdColumn>
          <TdColumn fieldId="nickname" label="닉네임" sortValue={item.nickname}>
            <span>{item.nickname}</span>
          </TdColumn>
          <TdColumn fieldId="gender" label="성별" sortValue={item.gender}>
            <span>{item.gender}</span>
          </TdColumn>
          <TdColumn fieldId="position" label="직책" sortValue={item.position}>
            <span>{item.position}</span>
          </TdColumn>
        </TableRow>
      )}
    </Table>
  );
};

export const Default: StoryComponent = {
  parameters: {
    docs: {
      source: {
        code:
          '\n// list에는 배열이나 null 값이 올 수 있으며 children을 함수로 반환한다.' +
          '\n// children 함수의 전달인자는 첫번째는 list의 요소, 두번째는 배열의 index 값이다.' +
          '\n// (list 요소의 타입은 자동으로 추론된다)' +
          '\n' +
          '\nconst ExampleTable = ({ list }: PropsType) => {' +
          '\n\tconst [list, setList] = useState(' +
          '\n\t\t[' +
          "\n\t\t\t{ name: '김정석', nickname: 'Simon', gender: 'man', position: 'Leader' }," +
          "\n\t\t\t{ name: '김정석', nickname: 'Simon', gender: 'man', position: 'Leader' }," +
          "\n\t\t\t{ name: '이동재', nickname: 'James', gender: 'man', position: 'Member' }," +
          "\n\t\t\t{ name: '송현영', nickname: 'Sonny', gender: 'man', position: 'Member' }," +
          "\n\t\t\t{ name: '김종완', nickname: 'Derek', gender: 'man', position: 'Member' }," +
          "\n\t\t\t{ name: '정도영', nickname: 'Jack', gender: 'man', position: 'Member' }," +
          '\n\t\t];' +
          '\n\t' +
          '\n\treturn (' +
          '\n\t\t<div className="exmaple-table">' +
          '\n\t\t\t<Table list={list}>' +
          '\n\t\t\t\t{ ({ item, index }) => (' +
          '\n\t\t\t\t\t<TableRow key={index}>' +
          '\n\t\t\t\t\t\t<TdColumn fieldId="nameText" label="이름" size={130} sortValue={item.name}>' +
          "\n\t\t\t\t\t\t\t<span style={{ color: '#fff' }}>{item.name}</span>" +
          '\n\t\t\t\t\t\t</TdColumn>' +
          '\n\t\t\t\t\t\t<TdColumn fieldId="nickname" label="닉네임" sortValue={item.nickname}>' +
          "\n\t\t\t\t\t\t\t<span style={{ color: '#fff' }}>{item.nickname}</span>" +
          '\n\t\t\t\t\t\t</TdColumn>' +
          '\n\t\t\t\t\t\t<TdColumn fieldId="gender" label="성별" sortValue={item.gender}>' +
          "\n\t\t\t\t\t\t\t<span style={{ color: '#fff' }}>{item.gender}</span>" +
          '\n\t\t\t\t\t\t</TdColumn>' +
          '\n\t\t\t\t\t\t<TdColumn fieldId="position" label="직책" sortValue={item.position}>' +
          "\n\t\t\t\t\t\t\t<span style={{ color: '#fff' }}>{item.position}</span>" +
          '\n\t\t\t\t\t\t</TdColumn>' +
          '\n\t\t\t\t\t<TableRow/>' +
          '\n\t\t\t\t)}' +
          '\n\t\t\t</Table>' +
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
    list: [
      { name: '김정석', nickname: 'Simon', gender: 'man', position: 'Leader' },
      { name: '정형근', nickname: 'Larry', gender: 'man', position: 'Member' },
      { name: '이동재', nickname: 'James', gender: 'man', position: 'Member' },
      { name: '송현영', nickname: 'Sonny', gender: 'man', position: 'Member' },
      { name: '김종완', nickname: 'Derek', gender: 'man', position: 'Member' },
      { name: '정도영', nickname: 'Jack', gender: 'man', position: 'Member' }
    ]
  },
  render: Template
};
