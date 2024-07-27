import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import useDialogList from 'src/hooks/useDialogList';
import { UserRole } from 'src/store/user/types';
import { getUserInfo } from 'src/utils';
import DataTable from './data-table';

const EvaluateList = () => {
  const userInfo = getUserInfo();

  const { dialogs, fetchDialogList } = useDialogList({});

  useEffect(() => {
    if (dialogs.length === 0 && userInfo?.role === UserRole.SUPERVISOR)
      fetchDialogList();
  }, [dialogs.length, fetchDialogList, userInfo?.role]);

  if (userInfo?.role !== UserRole.SUPERVISOR)
    return <Navigate to='/not-found' replace />;

  return (
    <>
      <h3 className='text-white px-10 pt-10'>List Dialog</h3>
      <DataTable dialogs={dialogs} />
    </>
  );
};

export default EvaluateList;
