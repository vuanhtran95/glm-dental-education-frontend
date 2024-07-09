import { Virtuoso } from 'react-virtuoso';
import { MessageDetail } from '../../store/dialog/types';
import MessageItemText from './message-item-text';
import { useCallback, useEffect, useRef } from 'react';

interface Props {
  messages: MessageDetail[] | [];
}

const MessageBox = ({ messages }: Props) => {
  const virtuoso = useRef(null);

  const onScrollBottom = useCallback(() => {
    setTimeout(() => {
      virtuoso?.current?.scrollToIndex({
        index: messages.length,
        align: 'end',
        behavior: 'auto',
      });
    }, 0);
  }, [messages.length]);

  useEffect(() => {
    onScrollBottom();
  }, [messages.length, onScrollBottom]);

  return (
    <div className='h-[85vh] md:h-[90vh]'>
      <Virtuoso
        ref={virtuoso}
        data={messages || []}
        style={{ paddingRight: '10px' }}
        totalCount={200}
        itemContent={(index: number, message: MessageDetail) => {
          return (
            <MessageItemText
              id={index === messages.length - 1 ? 'audio-player' : ''}
              message={message}
              index={index}
              key={index}
            />
          );
        }}
      />
    </div>
  );
};

export default MessageBox;
