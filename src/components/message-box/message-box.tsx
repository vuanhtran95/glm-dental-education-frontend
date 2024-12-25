import { Virtuoso, VirtuosoHandle } from "react-virtuoso";
import MessageItemText from "./message-item-text";
import { useCallback, useEffect, useRef } from "react";
import { MessageDetail } from "src/store/dialog/types";

interface Props {
  messages: MessageDetail[] | [];
  isMale: boolean;
  shouldShowFeedback: boolean;
}

const MessageBox = ({
  messages,
  isMale,
  shouldShowFeedback = false,
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
    <div className="pt-[50px] md:pt-2" style={{ height: "calc(100vh - 136px)" }}>
      <div className="h-full">{messages.length > 0 ? (
        <Virtuoso
          ref={virtuoso}
          data={messages || []}
          style={{ paddingRight: "10px" }}
          totalCount={200}
          itemContent={(index: number, message: MessageDetail) => {
            return (
              <MessageItemText
                id={index === messages.length - 1 ? "audio-player" : ""}
                message={message}
                index={index}
                key={index}
                isMale={isMale}
                shouldShowFeedback={shouldShowFeedback}
              />
            );
          }}
        />
      ) : (
        <></>
      )}</div>
    </div>
  );
};

export default MessageBox;
