import { Virtuoso } from 'react-virtuoso';
import ChatItemText from './components/chat-item-text';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import useDialogDetail from '../../hooks/useDialogDetail';
import { MessageDetail } from '../../store/dialog/types';
import dayjs from 'dayjs';

const Chat = () => {
  const params = useParams();

  const { fetchDialogDetail, dialogDetail } = useDialogDetail({
    dialogId: params.id,
  });

  useEffect(() => {
    !!params.id && fetchDialogDetail();
  }, [fetchDialogDetail, params.id]);

  console.log(dialogDetail?.detail.messages, 'dialogDetail');

  return (
    <Virtuoso
      data={dialogDetail?.detail.messages || []}
      style={{ height: '600px' }}
      totalCount={200}
      itemContent={(index: number, message: MessageDetail) => {
        const date = dayjs(message.createdAt);
        console.log(message, 'message');

        return (
          <ChatItemText
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

export default Chat;
