import { Virtuoso, VirtuosoHandle } from "react-virtuoso";
import MessageItemText from "./message-item-text";
import { useCallback, useEffect, useRef } from "react";
import { MessageDetail } from "src/store/dialog/types";

interface Props {
  messages: MessageDetail[] | [];
}

const MessageBox = ({
  messages,
}: Props) => {
  const virtuoso = useRef<VirtuosoHandle>(null);

  const onScrollBottom = useCallback(() => {
    setTimeout(() => {
      virtuoso?.current?.scrollToIndex({
        index: messages.length,
        align: "end",
        behavior: "auto",
      });
    }, 0);
  }, [messages.length]);

  useEffect(() => {
    onScrollBottom();
  }, [messages.length, onScrollBottom]);

  return (
    <div className="pt-[50px] md:pt-0 pb-2 flex-1">
      <Virtuoso
        ref={virtuoso}
        data={messages || []}
        style={{ paddingRight: "10px" }}
        totalCount={200}
        itemContent={(index: number, message: MessageDetail) => {
          return (
            <MessageItemText
              index={index}
              message={message}
            />
          );
        }}
      />
    </div>
  );
};

export default MessageBox;
