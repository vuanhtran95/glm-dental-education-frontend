import { Virtuoso } from 'react-virtuoso';
import { MessageDetail } from '../../store/dialog/types';
import MessageItemText from './message-item-text';
import dayjs from 'dayjs';
import { useCallback, useEffect, useRef } from 'react';

interface Props {
  messages: MessageDetail[] | [];
}

const MessageBox = ({ messages }: Props) => {
  const virtuoso = useRef(null);

  const onScrollBottom = useCallback(() => {
    virtuoso?.current?.scrollToIndex({
      index: messages.length - 1,
      align: 'end',
      behavior: 'auto',
    });
  }, [messages.length]);

  useEffect(() => {
    onScrollBottom();
  }, [messages.length, onScrollBottom]);

  return (
    <Virtuoso
      ref={virtuoso}
      data={messages || []}
      style={{ height: '600px' }}
      totalCount={200}
      itemContent={(index: number, message: MessageDetail) => {
        const date = dayjs(message.createdAt);
        return (
          <MessageItemText
            name={''}
            time={date.format('DD MM YYYY hh:ss')}
            content={message.content}
            index={index}
          />
        );
      }}
    />
  );
};

export default MessageBox;
