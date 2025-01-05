import useResponsive from "src/hooks/useResponsive";

interface Props {
  openSidebar: () => void;
}

const Header = ({ openSidebar }: Props) => {
  const { isMobile } = useResponsive();

  if (!isMobile) return null;

  return (
    <header className="fixed w-full z-50">
      <nav className="px-3 lg:px-6 py-2 bg-gray-800 h-14 border-b border-white">
        <div className="flex flex-wrap justify-end items-center mx-auto">
          <button
            onClick={openSidebar}
            type="button"
            className="py-2.5 px-5 text-xs font-small text-gray-900 bg-white rounded-lg border border-gray-200 bg-gray-800 text-gray-400 border-gray-600 mr-auto"
          >
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
