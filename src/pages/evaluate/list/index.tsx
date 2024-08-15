import { useEffect, useMemo } from 'react';
import useDialogList from 'src/hooks/useDialogList';
import { UserRole } from 'src/store/user/types';
import { getUserInfo } from 'src/utils';
import { Button, Table } from 'antd';
import useAllowedRoles from 'src/hooks/useUserRole';
import { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';

const EvaluateList = () => {
  const userInfo = getUserInfo();

  const navigate = useNavigate();

  const { dialogData, fetchDialogList } = useDialogList({});

  const columns: ColumnsType = useMemo(() => {
    return [
      {
        title: 'Patient Name',
        dataIndex: 'patientName',
        key: 'patientName',
      },
      {
        title: 'Symptoms',
        dataIndex: 'symptoms',
        key: 'symptoms',
      },
      {
        title: 'Student Id',
        dataIndex: 'studentId',
        key: 'studentId',
      },
      {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
        render: (item) => (
          <Button onClick={() => navigate(`/evaluate/${item.id}`)}>
            Evaluate
          </Button>
        ),
      },
    ];
  }, [navigate]);

  useAllowedRoles([UserRole.SUPERVISOR]);

  useEffect(() => {
    if (dialogData.length === 0) fetchDialogList();
  }, [dialogData.length, fetchDialogList, userInfo?.role]);

  console.log(dialogData, ' dialogs');

  return (
    <>
      <h3 className='text-white px-10 pt-10'>List Dialog</h3>
      <div className='m-8'>
        <Table dataSource={dialogData} columns={columns} />
      </div>
    </>
  );
};

export default EvaluateList;
