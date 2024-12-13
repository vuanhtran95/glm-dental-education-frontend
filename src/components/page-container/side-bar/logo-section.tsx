interface Props {
  closeSidebar: () => void;
}

const LogoSection = ({ closeSidebar }: Props) => {
  return (
    <div className="mb-10 flex">
      <a href="#" className="flex items-center ps-2.5">
        <img
          src="https://flowbite.com/docs/images/logo.svg"
          className="h-6 me-3 sm:h-7"
        />
        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
          Virtual Patient
        </span>
      </a>
      <button
        type="button"
        onClick={closeSidebar}
        className="sm:hidden ml-auto focus:outline-none bg-white rounded-lg 
       hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 
        focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 
         dark:hover:text-white dark:hover:bg-gray-700 w-[15px]"
      >
        <i className="fa-solid fa-xmark"></i>
      </button>
    </div>
  );
};

export default LogoSection;
