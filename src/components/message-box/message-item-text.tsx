import { EMessageRole, MessageDetail } from "../../store/dialog/types";
import dayjs from "dayjs";

import { avatarImg, displayedRole } from "./utils";


interface Props {
  message: MessageDetail;
  index: number;
}

const MessageItemText = ({
  message,
  index
}: Props) => {
  const { createdAt, content, role } = message;

  const date = dayjs(createdAt).format("HH:mm");

  const isUserRole = role === EMessageRole.USER;

  return (
    <div
      className={`flex items-center gap-2.5 my-4 px-2 md:px-8 ${
        isUserRole && "flex-row-reverse"
      }`}
      id={`message-${index}`}
    >
      <img
        className="w-8 h-8 rounded-full cursor-pointer"
        src={avatarImg(role)}
      />
      <div className="flex flex-col leading-1.5 px-4 py-2 border-gray-200 rounded-lg bg-gray-700 max-w-[80%]">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <span className="text-sm font-semibold text-gray-900 text-white">
            {displayedRole(role)}
          </span>
          <span className="text-sm font-normal text-gray-500 text-gray-400">
            {date}
          </span>
        </div>
        <p className="text-sm font-normal py-2.5 text-gray-900 text-white cursor-pointer">
          {content}
        </p>
        
      </div>
    </div>
  );
};

export default MessageItemText;
