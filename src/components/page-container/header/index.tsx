const Header = () => {
  return (
    <header>
      <nav className='bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-700 h-14'>
        <div className='flex flex-wrap justify-end items-center mx-auto'>
          <div className='flex items-center'>
            <a
              href='#'
              className='text-gray-300 font-medium text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2'
            >
              Log out
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
