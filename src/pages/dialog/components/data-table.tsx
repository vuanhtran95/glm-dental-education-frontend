import { Space, Table } from 'antd';
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
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text || 'No Name'}</a>,
      onCellClick: (row) => navigate(`/dialog/${row._id}`),
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
          <a>
            <i className='fa-solid fa-box-archive'></i>
          </a>
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
          onClick: () => navigate(`/dialog/${record._id}`), // click row
        };
      }}
    />
  );
};

export default DataTable;
