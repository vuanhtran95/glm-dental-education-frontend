import { useParams } from 'react-router-dom';
import MessageBox from '../../../components/message-box/message-box';
import useDialogDetail from '../../../hooks/useDialogDetail';
import { useCallback, useEffect, useState } from 'react';
import Header from '../../../components/header';
import Input from '../../../components/input';
import Button from '../../../components/button';
import { useDispatch } from 'react-redux';
import { createMessageAction } from '../../../store/dialog/actions';

const DialogDetail = () => {
  const params = useParams();

  const dialogId = params.id;

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [createMessage, setCreateMessage] = useState<string>('');

  const { dialogDetail, fetchDialogDetail } = useDialogDetail({
    dialogId,
  });

  const dispatch = useDispatch();

  const messages = dialogDetail?.detail.messages || [];
  const dialog = dialogDetail?.detail.dialog;
  const scenario = dialogDetail?.detail.scenario;

  const onCreateMessage = useCallback(() => {
    setIsLoading(true);
    if (!dialogId) return;
    const successCallback = () => {
      fetchDialogDetail();
      setCreateMessage('');
      setIsLoading(false);
    };
    dispatch(createMessageAction(createMessage, dialogId, successCallback));
  }, [createMessage, dialogId, dispatch, fetchDialogDetail]);

  useEffect(() => {
    fetchDialogDetail();
  }, [fetchDialogDetail]);

  return (
    <>
      <Header title={`Dialog: ${dialog?.name || ''}`} />
      <div className='flex flex-row gap-x-36'>
        <div className='max-w-60'>
          <div>Scenario:</div>
          <div>Patient name: {scenario?.patientName}</div>
          <div>Symptoms: {scenario?.symptoms}</div>
        </div>
        <div className='grow'>
          <div className='w-full border p-4'>
            <MessageBox messages={messages} />
          </div>
          <div className='flex align-middle	justify-between items-end	'>
            <div className='w-full mr-4'>
              <Input
                value={createMessage}
                onChange={(e) => setCreateMessage(e as string)}
              />
            </div>
            <div>
              <Button
                label={'Send'}
                onClick={() => onCreateMessage()}
                loading={isLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DialogDetail;
