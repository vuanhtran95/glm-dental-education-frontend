import { useCallback, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MenuItem } from './types';

const Menu = () => {
  const navigation = useNavigate();
  const location = useLocation();

  const path = location.pathname.substring(1);

  const [activePath, setActivePath] = useState<string | null>(path);

  console.log(path, 'path');

  const menuItems: MenuItem[] = [
    {
      label: 'Dashboard',
      pathName: 'dashboard',
    },
    {
      label: 'Dialog',
      pathName: 'dialog',
    },
    { label: 'Scenario', pathName: 'scenario' },
  ];

  const onClickMenuItem = useCallback(
    (pathName: string) => {
      navigation(`/${pathName}`);
      setActivePath(pathName);
    },
    [navigation]
  );

  return (
    <div className='hidden md:block'>
      <div className='ml-10 flex items-baseline space-x-4'>
        {menuItems.map((item) => {
          return (
            <a
              href='#'
              onClick={() => onClickMenuItem(item.pathName)}
              className={`rounded-md px-3 py-2 text-sm font-medium text-white ${
                item.pathName === activePath && 'bg-gray-900'
              }`}
              aria-current='page'
            >
              {item.label}
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default Menu;
