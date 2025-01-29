import useResponsive from "src/hooks/useResponsive";
import MobileHelp from "./mobile-help";
import DesktopHelp from "./desktop-help";

const HelpPage = () => {
  const { isMobile } = useResponsive();
  return isMobile ? <MobileHelp /> : <DesktopHelp />;
};

export default HelpPage;
