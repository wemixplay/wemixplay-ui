import type { Meta, StoryObj, StoryFn } from '@storybook/react';
import Table from '@/components/table/Table';
import TableRow from '@/components/table/TableRow';
import TdColumn from '@/components/table/TdColumn';
import TdExpend from '@/components/table/TdExpend';

type StoryComponent = StoryObj<typeof TableRow>;
type StoryTemplate = StoryFn<typeof TableRow>;

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  component: TableRow,
  tags: ['autodocs'],
  argTypes: {}
} as Meta<typeof TableRow>;

const Template: StoryTemplate = (args) => {
  const list = [{ id: '1', name: '김종완', nickname: 'Derek', gender: 'man', position: 'Member' }];

  return (
    <Table list={list}>
      {({ item, index }) => (
        <TableRow key={`tr-${item.id ?? index}`} {...args}>
          <TdColumn fieldId="nameText" label="이름" size={130} sortValue={item.name} expend>
            <span>{item.name}</span>
          </TdColumn>
          <TdColumn fieldId="nickname" label="닉네임" sortValue={item.nickname} expend>
            <span>{item.nickname}</span>
          </TdColumn>
          <TdColumn fieldId="gender" label="성별" sortValue={item.gender} expend>
            <span>{item.gender}</span>
          </TdColumn>
          <TdColumn fieldId="position" label="직책" sortValue={item.position} expend>
            <span>{item.position}</span>
          </TdColumn>
          <TdExpend style={{ padding: 8 }}>테스트 입니다~!</TdExpend>
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
          '\nconst ExampleTable = ({ list }: PropsType) => {' +
          '\n\tconst [list, setList] = useState(' +
          '\n\t\t[' +
          "\n\t\t\t{ name: '김종완', nickname: 'Derek', gender: 'man', position: 'Member' }," +
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
      }
    }
  },
  args: {},
  render: Template
};
