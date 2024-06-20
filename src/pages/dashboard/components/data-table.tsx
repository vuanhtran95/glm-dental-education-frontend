import { Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import { DialogDetail } from '../../../store/dialog/types';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

interface Props {
  data: DialogDetail[];
}

const DataTable = ({ data }: Props) => {
  const navigate = useNavigate();

  const columns: TableProps<DialogDetail>['columns'] = [
    {
      title: 'Conversation Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text || 'No Name'}</a>,
      onCellClick: (row) => navigate(`/chat/${row._id}`),
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (data) => {
        const date = dayjs(data);
        return <span>{date.format('YYYY-MM-DD HH:mm:ss')}</span>;
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <Space size='middle'>
          <a>Archive</a>
        </Space>
      ),
    },
  ];
  return (
    <Table
      className='data-table'
      columns={columns}
      dataSource={data}
      onRow={(record) => {
        return {
          onClick: () => navigate(`/chat/${record._id}`), // click row
        };
      }}
    />
  );
};

export default DataTable;
