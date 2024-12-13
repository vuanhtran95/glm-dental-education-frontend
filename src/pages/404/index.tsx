import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "src/constants";
import { UserRole } from "src/store/user/types";
import { getUserInfo } from "src/utils";

const NotFound = () => {
  const user = getUserInfo();
  const navigate = useNavigate();

  const onHomeClick = useCallback(() => {
    let route;

    switch (user?.role) {
      case UserRole.STUDENT:
        route = APP_ROUTES.NEW_CHAT;
        break;
      case UserRole.SUPERVISOR:
        route = APP_ROUTES.EVALUATE;
        break;
      default:
        route = APP_ROUTES.LOGIN;
    }
    navigate(route);
  }, [navigate, user]);

  return (
    <div className="relative">
      <div className="absolute top-[30vh] left-[50%] flex flex-col justify-center items-center">
        <div>Not Found</div>
        <a className="cursor-pointer" onClick={onHomeClick}>
          Back to home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
