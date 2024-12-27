import { Outlet } from "react-router-dom";
import SideBar from "./side-bar";
import Header from "./header";
import { useState } from "react";

const PageContainer = () => {
  const [isActive, setIsActive] = useState(false);

  const handleToggleSidebar = () => {
    setIsActive(!isActive);
  };

  return (
    <main className="h-full">
      <SideBar
        className={`${isActive ? "translate-x-0" : ""}`}
      />
      <Header openSidebar={handleToggleSidebar} />
      <Outlet />
    </main>
  );
};

export default PageContainer;
