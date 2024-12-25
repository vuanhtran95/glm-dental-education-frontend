import MenuItem from "./menu-item";

interface Props {
  className?: string;
}

const SideBar = ({ className }: Props) => {
  return <MenuItem className={className} />;
};

export default SideBar;
