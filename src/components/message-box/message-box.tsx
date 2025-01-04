import { Virtuoso, VirtuosoHandle } from "react-virtuoso";
import MessageItemText from "./message-item-text";
import { useCallback, useEffect, useRef } from "react";
import { MessageDetail } from "src/store/dialog/types";

interface Props {
  messages: MessageDetail[] | [];
  isLoading?: boolean;
}

const MessageBox = ({ messages, isLoading }: Props) => {
  const virtuoso = useRef<VirtuosoHandle>(null);

  const onScrollBottom = useCallback(() => {
    setTimeout(() => {
      virtuoso?.current?.scrollToIndex({
        index: messages.length + 1,
        align: "end",
        behavior: "auto",
      });
    }, 0);
  }, [messages.length]);

  useEffect(() => {
    onScrollBottom();
  }, [messages.length, onScrollBottom]);

  return (
    <div className="pt-[50px] md:pt-0 pb-2 flex-1 relative">
      {!!isLoading ? (
        <div className="fa-3x m-auto text-gray-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <i className="fas fa-circle-notch fa-spin" />
        </div>
      ) : messages.length > 0 ? (
        <Virtuoso
          ref={virtuoso}
          data={messages || []}
          style={{ paddingRight: "10px" }}
          totalCount={200}
          itemContent={(index: number, message: MessageDetail) => {
            return <MessageItemText index={index} message={message} />;
          }}
        />
      ) : (
        <div className="text-center text-gray-600 m-auto text-gray-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          No messages
        </div>
      )}
    </div>
  );
};

export default MessageBox;
