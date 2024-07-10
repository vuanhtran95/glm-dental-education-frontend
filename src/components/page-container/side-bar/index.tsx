import MenuItem from './menu-item';

interface Props {
  className?: string;
  closeSidebar: () => void;
}

const SideBar = ({ className, closeSidebar }: Props) => {
  return <MenuItem closeSidebar={closeSidebar} className={className} />;
};

export default SideBar;
