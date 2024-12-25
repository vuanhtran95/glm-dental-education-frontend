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
    <div className="min-h-screen">
      <SideBar
        className={`${isActive ? "translate-x-0" : ""}`}
      />
      <main className="min-h-screen">
        <Header openSidebar={handleToggleSidebar} />
          <Outlet />
      </main>
    </div>
  );
};

export default PageContainer;
