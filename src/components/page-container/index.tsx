import { Outlet } from 'react-router-dom';
import Avatar from './nav-bar/avatar';
import Notification from './nav-bar/notification';
import Menu from './nav-bar/menu';
import Logo from './nav-bar/logo';
import { useState } from 'react';
import MenuDrawer from './menu-drawer';

const PageContainer = () => {
  const [isShownDrawer, setIsShownDrawer] = useState<boolean>(false);
  return (
    <div className='min-h-full'>
      <nav className='bg-gray-800'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='flex h-16 items-center justify-between'>
            <div className='flex items-center'>
              <Logo onClick={() => setIsShownDrawer(!isShownDrawer)} />
              <Menu />
            </div>
            <div className='ml-4 flex items-center md:ml-6'>
              <Notification />
              <Avatar />
            </div>
          </div>
        </div>
      </nav>
      <main>
        <div className='mx-auto max-w-7xl py-6 sm:px-6 lg:px-8'>
          <Outlet />
        </div>
      </main>
      <MenuDrawer />
    </div>
  );
};

export default PageContainer;
