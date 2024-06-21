import { Virtuoso } from 'react-virtuoso';
import MessageItemText from '../../components/message-box/message-item-text';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import useDialogDetail from '../../hooks/useDialogDetail';
import { MessageDetail } from '../../store/dialog/types';
import dayjs from 'dayjs';
import MessageBox from '../../components/message-box/message-box';

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
      <MessageBox messages={dialogDetail?.detail.messages} />
    </>
  );
};

export default Dialog;
