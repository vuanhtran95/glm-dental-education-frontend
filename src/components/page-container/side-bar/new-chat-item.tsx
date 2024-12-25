import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "src/constants";

const NewChatItem = () => {
  const navigate = useNavigate();

  return (
    <>
      <a
        onClick={() => navigate(APP_ROUTES.NEW_CHAT)}
        href="#"
        className="flex mb-6 text-sm items-center p-2 text-gray-900 rounded-lg text-white hover:bg-gray-100 hover:bg-gray-700 group"
      >
        <i className="fa-solid fa-plus"></i>
        <span className="ms-3">New Chat</span>
      </a>

      <p className="mb-6">Recent chat</p>
    </>
  );
};

export default NewChatItem;
