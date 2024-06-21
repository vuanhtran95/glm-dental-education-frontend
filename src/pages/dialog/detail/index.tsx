import { useParams } from 'react-router-dom';
import MessageBox from '../../../components/message-box/message-box';
import useDialogDetail from '../../../hooks/useDialogDetail';
import { useEffect } from 'react';
import Header from '../../../components/header';

const DialogDetail = () => {
  const params = useParams();

  const { dialogDetail, fetchDialogDetail } = useDialogDetail({
    dialogId: params.id,
  });

  const messages = dialogDetail?.detail.messages || [];
  const dialog = dialogDetail?.detail.dialog;
  const scenario = dialogDetail?.detail.scenario;

  useEffect(() => {
    fetchDialogDetail();
  }, [fetchDialogDetail]);

  return (
    <>
      <Header title={`Dialog: ${dialog?.name || ''}`} />
      <div className='flex flex-row gap-x-36'>
        <div className=''>
          <div>Scenario:</div>
          <div>Patient name: {scenario?.patientName}</div>
          <div>Symptoms: {scenario?.symptoms.map((e) => `${e.name}, `)}</div>
        </div>
        <div className='w-full grow'>
          <MessageBox messages={messages} />
        </div>
      </div>
    </>
  );
};

export default DialogDetail;
