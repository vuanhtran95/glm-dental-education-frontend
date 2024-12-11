import '@fortawesome/fontawesome-free/css/all.min.css';
import NewChatItem from './new-chat-item';
import useDialogList from '../../../hooks/useDialogList';
import { getUserInfo } from '../../../utils';
import { useEffect } from 'react';
import LogoSection from './logo-section';
import LogOut from './log-out';
import ListDialog from './list-dialog';
import { UserRole } from 'src/store/user/types';
import useAllowedRoles from 'src/hooks/useUserRole';

interface Props {
  className?: string;
  closeSidebar: () => void;
}

const MenuItem = ({ className, closeSidebar }: Props) => {
  const userInfo = getUserInfo();

  const { dialogData, fetchDialogList } = useDialogList({
    userId: userInfo?._id || '',
  });

  const { isStudent } = useAllowedRoles([
    UserRole.STUDENT,
    UserRole.SUPERVISOR,
  ]);

  useEffect(() => {
    if (dialogData.length === 0 && isStudent) fetchDialogList();
  }, [dialogData.length, fetchDialogList, isStudent]);

  return (
    <aside
      id='logo-sidebar'
      className={`fixed text-white top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 ${
        className ?? ''
      }`}
      aria-label='Sidebar'
    >
      <div className='h-full flex flex-col px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800'>
        <LogoSection closeSidebar={closeSidebar} />
        {isStudent && (
          <>
            <NewChatItem />
            <ListDialog dialogs={dialogData} />
          </>
        )}
        <LogOut />
      </div>
    </aside>
  );
};

export default MenuItem;
