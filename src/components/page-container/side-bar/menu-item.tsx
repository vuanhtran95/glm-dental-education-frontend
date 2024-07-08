import '@fortawesome/fontawesome-free/css/all.min.css';
import NewChatItem from './new-chat-item';
import useDialogList from '../../../hooks/useDialogList';
import { getUserInfo } from '../../../utils';
import { useEffect } from 'react';
import { DialogDetail } from '../../../store/dialog/types';
import { useNavigate } from 'react-router-dom';

const MenuItem = () => {
  const userInfo = getUserInfo();
  const navigate = useNavigate();

  const { dialogs, fetchDialogList } = useDialogList({
    userId: userInfo?._id || '',
  });

  useEffect(() => {
    if (dialogs.length === 0) fetchDialogList();
  }, [dialogs.length, fetchDialogList]);

  return (
    <aside
      id='logo-sidebar'
      className='fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0'
      aria-label='Sidebar'
    >
      <div className='h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800'>
        <a
          href='https://flowbite.com/'
          className='flex items-center ps-2.5 mb-5'
        >
          <img
            src='https://flowbite.com/docs/images/logo.svg'
            className='h-6 me-3 sm:h-7'
            alt='Flowbite Logo'
          />
          <span className='self-center text-xl font-semibold whitespace-nowrap dark:text-white'>
            Flowbite
          </span>
        </a>
        <ul className='space-y-2 font-medium'>
          {/* New chat */}
          <NewChatItem />

          <li>
            <p className='text-white font-bold'>Recent chat</p>
          </li>

          {dialogs.map((dialog: DialogDetail) => {
            return (
              <li
                onClick={() => {
                  navigate(`/dialog/${dialog._id}`);
                }}
              >
                <a
                  href='#'
                  className='flex items-center p-1 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'
                >
                  <i class='fa-regular fa-message'></i>
                  <span className='flex-1 ms-3 whitespace-nowrap'>
                    {dialog.name}
                  </span>
                  <span className='inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300'>
                    Pro
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
};

export default MenuItem;
