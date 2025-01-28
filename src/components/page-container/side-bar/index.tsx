import MenuItem from "./menu-item";

interface Props {
  className?: string;
  setSidebar: (state: boolean) => void;
  isActive: boolean;
}

const SideBar = ({ className, setSidebar, isActive }: Props) => {
  return (
    <MenuItem
      className={className}
      setSidebar={setSidebar}
      isActive={isActive}
    />
  );
};

export default SideBar;
