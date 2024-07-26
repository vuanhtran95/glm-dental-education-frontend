import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import useDialogList from 'src/hooks/useDialogList';
import { UserRole } from 'src/store/user/types';
import { getUserInfo } from 'src/utils';

const Evaluate = () => {
  const userInfo = getUserInfo();

  const { dialogs, fetchDialogList } = useDialogList({});
  console.log(dialogs, 'dialogs');

  useEffect(() => {
    if (dialogs.length === 0 && userInfo?.role === UserRole.SUPERVISOR)
      fetchDialogList();
  }, [dialogs.length, fetchDialogList, userInfo?.role]);

  if (userInfo?.role !== UserRole.SUPERVISOR)
    return <Navigate to='/not-found' replace />;

  return <>List of </>;
};

export default Evaluate;
