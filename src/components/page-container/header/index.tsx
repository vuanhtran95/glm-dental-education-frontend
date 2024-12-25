import useResponsive from "src/hooks/useResponsive";

interface Props {
  openSidebar: () => void;
}

const Header = ({ openSidebar }: Props) => {
  const { isMobile } = useResponsive();

  if (!isMobile) return null;

  return (
    <header className="fixed w-full z-50">
      <nav className="border-gray-200 px-4 lg:px-6 py-2.5 bg-gray-700 h-14">
        <div className="flex flex-wrap justify-end items-center mx-auto">
          <button
            onClick={openSidebar}
            type="button"
            className="sm:hidden py-2.5 px-5 me-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 focus:ring-gray-700 bg-gray-800 text-gray-400 border-gray-600 hover:text-white hover:bg-gray-700 mr-auto"
          >
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
