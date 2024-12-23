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
    <div className="md:min-h-screen">
      <SideBar
        closeSidebar={handleToggleSidebar}
        className={`${isActive ? "translate-x-0" : ""}`}
      />
      <main className="md:min-h-screen">
        <Header openSidebar={handleToggleSidebar} />
        <div className="md:pt-0 sm:ml-64 md:min-h-screen bg-gradient-to-b from-blue-50 to-transparent dark:from-blue-900">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default PageContainer;
