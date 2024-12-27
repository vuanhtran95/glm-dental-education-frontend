import MenuItem from "./menu-item";

interface Props {
  className?: string;
  setSidebar: (state: boolean) => void;
}

const SideBar = ({ className, setSidebar }: Props) => {
  return <MenuItem className={className} setSidebar={setSidebar} />;
};

export default SideBar;
