import avatar from '../../../assets/avatar.png';

const Avatar = () => {
  return (
    <div className='relative ml-3'>
      <div>
        <button
          type='button'
          className='relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'
          id='user-menu-button'
          aria-expanded='false'
          aria-haspopup='true'
        >
          <span className='absolute -inset-1.5'></span>
          <span className='sr-only'>Open user menu</span>
          <img className='h-8 w-8 rounded-full' src={avatar} alt='' />
        </button>
      </div>

      <div
        className='hidden absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
        role='menu'
        aria-orientation='vertical'
        aria-labelledby='user-menu-button'
      >
        <a
          href='#'
          className='block px-4 py-2 text-sm text-gray-700'
          role='menuitem'
          id='user-menu-item-0'
        >
          Your Profile
        </a>
        <a
          href='#'
          className='block px-4 py-2 text-sm text-gray-700'
          role='menuitem'
          id='user-menu-item-1'
        >
          Settings
        </a>
        <a
          href='#'
          className='block px-4 py-2 text-sm text-gray-700'
          role='menuitem'
          id='user-menu-item-2'
        >
          Sign out
        </a>
      </div>
    </div>
  );
};

export default Avatar;
