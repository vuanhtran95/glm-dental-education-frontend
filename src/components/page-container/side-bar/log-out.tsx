import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "src/constants";

const LogOut = () => {
  const navigate = useNavigate();

  const onLogOut = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    navigate(APP_ROUTES.LOGIN);
  }, [navigate]);

  return (
    <p onClick={() => onLogOut()} className="mt-8 cursor-pointer">
      <i className="fa-solid fa-right-from-bracket" /> Log out
    </p>
  );
};

export default LogOut;
