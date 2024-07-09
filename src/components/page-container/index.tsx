import { Outlet } from 'react-router-dom';
import SideBar from './side-bar';

const PageContainer = () => {
  return (
    <div className='md:min-h-screen'>
      <SideBar />
      <main className='md:min-h-screen'>
        <div className='sm:ml-64 md:min-h-screen'>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default PageContainer;
