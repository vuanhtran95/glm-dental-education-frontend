import { Space, Table } from 'antd';
import type { TableProps } from 'antd';
import dayjs from 'dayjs';
import { ScenarioDetail, SymptomDetail } from '../../../store/scenario/types';
import useResponsive from '../../../hooks/useResponsive';

interface Props {
  data: ScenarioDetail[];
}

const DataTable = ({ data }: Props) => {
  const { isMobile } = useResponsive();

  const columns: TableProps<ScenarioDetail>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text || 'No Name'}</a>,
    },
    {
      title: 'Patient Name',
      dataIndex: 'patientName',
      key: 'patientName',
      render: (text) => <a>{text || 'No Name'}</a>,
    },
    ...(isMobile
      ? []
      : [
          {
            title: 'Symptoms',
            dataIndex: 'symptoms',
            key: 'symptoms',
            render: (symptoms: SymptomDetail[]) => {
              return <span>{symptoms}</span>;
            },
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
        ]),
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
          // onClick: () => navigate(`/dialog/${record._id}`),
        };
      }}
    />
  );
};

export default DataTable;
