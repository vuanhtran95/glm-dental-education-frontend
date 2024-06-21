import { Virtuoso } from 'react-virtuoso';
import { MessageDetail } from '../../store/dialog/types';
import MessageItemText from './message-item-text';
import dayjs from 'dayjs';

interface Props {
  messages: MessageDetail[] | [];
}

const MessageBox = ({ messages }: Props) => {
  return (
    <Virtuoso
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
