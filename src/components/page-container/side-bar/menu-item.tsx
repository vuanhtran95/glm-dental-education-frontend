import "@fortawesome/fontawesome-free/css/all.min.css";
import NewChatItem from "./new-chat-item";
import useDialogList from "../../../hooks/useDialogList";
import { getUserInfo } from "../../../utils";
import { useEffect } from "react";
import LogoSection from "./logo-section";
import LogOut from "./log-out";
import ListDialog from "./list-dialog";
import { UserRole } from "src/store/user/types";
import useAllowedRoles from "src/hooks/useUserRole";
import { useNavigate } from "react-router";

interface Props {
  className?: string;
  setSidebar: (state: boolean) => void;
  isActive: boolean;
}

const MenuItem = ({ className, setSidebar, isActive }: Props) => {
  const userInfo = getUserInfo();

  const navigate = useNavigate();

  const { dialogData, fetchDialogList } = useDialogList({
    userId: userInfo?._id || "",
  });

  const { isStudent } = useAllowedRoles([
    UserRole.STUDENT,
    UserRole.SUPERVISOR,
  ]);

  useEffect(() => {
    if (dialogData.length === 0 && isStudent) fetchDialogList();
  }, [dialogData.length, fetchDialogList, isStudent]);

  return (
    <aside
      id="logo-sidebar"
      className={`fixed text-white top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 ${
        className ?? ""
      }`}
      aria-label="Sidebar"
    >
      <div className="h-full flex flex-col px-3 py-20 md:py-4 overflow-y-auto bg-gray-50 bg-gray-800">
        <LogoSection
          onClick={() => {
            setSidebar(!isActive);
            navigate("/new-chat");
          }}
        />
        {isStudent && (
          <>
            <NewChatItem setSidebar={setSidebar} />
            <ListDialog setSidebar={setSidebar} dialogs={dialogData} />
          </>
        )}
        <LogOut />
      </div>
    </aside>
  );
};

export default MenuItem;
