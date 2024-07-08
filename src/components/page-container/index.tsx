import { Outlet } from 'react-router-dom';
import SideBar from './side-bar';

const PageContainer = () => {
  return (
    <div className='min-h-full'>
      <SideBar />
      <main>
        <div className='p-4 sm:ml-64'>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default PageContainer;
