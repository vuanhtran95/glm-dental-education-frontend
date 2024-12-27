import { Outlet } from "react-router-dom";
import SideBar from "./side-bar";
import Header from "./header";
import { useState } from "react";

const PageContainer = () => {
  const [isActive, setIsActive] = useState(false);

  const setSidebar = (state: boolean) => setIsActive(state);

  return (
    <main className="h-full">
      <SideBar
        className={`${isActive ? "translate-x-0" : ""}`}
        setSidebar={setSidebar}
      />
      <Header openSidebar={() => setSidebar(!isActive)} />
      <Outlet />
    </main>
  );
};

export default PageContainer;
