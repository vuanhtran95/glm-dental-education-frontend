import { Virtuoso } from 'react-virtuoso';
import MessageItemText from './components/message-item-text';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import useDialogDetail from '../../hooks/useDialogDetail';
import { MessageDetail } from '../../store/dialog/types';
import dayjs from 'dayjs';

const Dialog = () => {
  const params = useParams();

  const { fetchDialogDetail, dialogDetail } = useDialogDetail({
    dialogId: params.id,
  });

  const scenario = dialogDetail?.detail.scenario;

  useEffect(() => {
    !!params.id && fetchDialogDetail();
  }, [fetchDialogDetail, params.id]);

  return (
    <>
      <div className='my-4'>
        <p>Scenario: </p>
        <div>
          <span>Patient Name: {scenario?.patientName || '-'}</span>
          <span className='ml-8 '>Age: {scenario?.age || '-'}</span>
          <p>Symptoms: {scenario?.symptoms.map((s) => s.name + ', ')}</p>
        </div>
      </div>
      <Virtuoso
        data={dialogDetail?.detail.messages || []}
        style={{ height: '600px' }}
        totalCount={200}
        itemContent={(index: number, message: MessageDetail) => {
          const date = dayjs(message.createdAt);
          console.log(message, 'message');

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
    </>
  );
};

export default Dialog;
