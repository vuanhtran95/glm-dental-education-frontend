import { useNavigate } from 'react-router-dom';

const menu = [
  {
    url: '/dashboard',
    label: 'Dashboard',
  },
  {
    url: '/dialog',
    label: 'Dialog',
  },
];

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div
        id='sidebar'
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-slate-800 p-4 transition-all duration-200 ease-in-out ${'translate-x-0'}`}
      >
        <div className='space-y-8'>
          <div>
            <h3 className='text-xs uppercase text-slate-500 font-semibold pl-3'>
              <span className='lg:hidden lg:sidebar-expanded:block 2xl:block'>
                Settings
              </span>
            </h3>
            <ul className='mt-3'>
              <li className={'px-3 py-2 rounded-sm mb-0.5 last:mb-0'}>
                {menu.map((item) => {
                  return (
                    <>
                      <a
                        href='#0'
                        className={`block text-slate-200 truncate transition duration-15 hover:text-slate-200`}
                      >
                        <div className='flex items-center justify-between'>
                          <div className='flex items-center'>
                            <span
                              onClick={() => navigate(item.url)}
                              className='text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200'
                            >
                              {item.label}
                            </span>
                          </div>
                        </div>
                      </a>
                      <div className='lg:hidden lg:sidebar-expanded:block 2xl:block'>
                        <ul className={`pl-9 mt-1`}>
                          <li className='mb-1 last:mb-0'>
                            <span className='block text-slate-400 hover:text-slate-200 transition duration-150 truncate text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200'>
                              Sign in
                            </span>
                          </li>
                        </ul>
                      </div>
                    </>
                  );
                })}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
