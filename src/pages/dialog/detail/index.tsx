import { useParams } from 'react-router-dom';
import MessageBox from '../../../components/message-box/message-box';
import useDialogDetail from '../../../hooks/useDialogDetail';
import { useCallback, useEffect, useState } from 'react';
import Header from '../../../components/header';
import Button from '../../../components/button';
import { useDispatch } from 'react-redux';
import { createMessageAction } from '../../../store/dialog/actions';
import { EMessageRole } from '../../../store/dialog/types';
import { removeTextInsideAsterisks } from '../../../utils';
import useResponsive from '../../../hooks/useResponsive';

const DialogDetail = () => {
  const params = useParams();

  const dialogId = params.id;

  const { isMobile } = useResponsive();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [createMessage, setCreateMessage] = useState<string>('');

  const { dialogDetail, fetchDialogDetail } = useDialogDetail({
    dialogId,
  });

  const dispatch = useDispatch();

  const messages = dialogDetail?.detail.messages || [];
  const dialog = dialogDetail?.detail.dialog;
  const scenario = dialogDetail?.detail.scenario;

  const onSendMessage = useCallback(() => {
    setIsLoading(true);
    if (!dialogId) return;

    const bodyMessage = {
      history: [
        ...messages.map((e) => ({ role: e.role, content: e.content })),
        { role: EMessageRole.USER, content: createMessage },
      ],
    };

    const headers = new Headers({
      'Access-Control-Allow-Origin': '*',
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Headers':
        'Content-Type, Authorization, X-Requested-With',
    });

    fetch('http://18.171.155.16:8080/process_message', {
      method: 'POST',
      headers,
      body: JSON.stringify(bodyMessage),
    })
      .then((e) => {
        e.json().then((e) => {
          dispatch(
            createMessageAction(
              createMessage,
              dialogId,
              EMessageRole.USER,
              () =>
                dispatch(
                  createMessageAction(
                    removeTextInsideAsterisks(e),
                    dialogId,
                    EMessageRole.ASSISTANT,
                    () => {
                      fetchDialogDetail();
                      setCreateMessage('');
                      setIsLoading(false);
                    }
                  )
                )
            )
          );
        });
      })
      .catch();

    // dispatch(createMessageAction(createMessage, dialogId));
  }, [dialogId, messages]);

  // const onCreateMessage = useCallback(() => {
  //   setIsLoading(true);
  //   if (!dialogId) return;
  //   const successCallback = () => {
  //     fetchDialogDetail();
  //     setCreateMessage('');
  //     setIsLoading(false);
  //   };
  //   const errorCallback = () => {
  //     fetchDialogDetail();
  //     setCreateMessage('');
  //     setIsLoading(false);
  //   };
  //   dispatch(
  //     createMessageAction(
  //       createMessage,
  //       dialogId,
  //       successCallback,
  //       errorCallback
  //     )
  //   );
  // }, [createMessage, dialogId, dispatch, fetchDialogDetail]);

  useEffect(() => {
    fetchDialogDetail();
  }, [fetchDialogDetail]);

  return (
    <>
      <Header title={`Dialog: ${dialog?.name || ''}`} />
      <div className='flex flex-row gap-x-36 mt-8'>
        {!isMobile && (
          <div className='max-w-60 flex flex-col gap-4'>
            <div>
              <b>Scenario:</b>
            </div>
            <div>
              <b>Patient name:</b> {scenario?.patientName}
            </div>
            <div>
              <b>Age: </b> {scenario?.age}
            </div>
            <div>
              <b>Communication style: </b> {scenario?.communicationStyle}
            </div>
            <div>
              <b>Symptoms:</b> {scenario?.symptoms}
            </div>
            <div>
              <b>Medical history:</b> {scenario?.medicalHistory}
            </div>
            <div>
              <b>Life style:</b> {scenario?.lifeStyle}
            </div>
            <div>
              <b>Additional Information:</b> {scenario?.additionalInformation}
            </div>
          </div>
        )}

        <div className='grow p-2'>
          <div className='w-full border p-4'>
            <MessageBox
              messages={
                messages?.filter((e) => e.role !== EMessageRole.SYSTEM) || []
              }
            />
          </div>
          <div className='flex align-middle	justify-between items-end	mt-2'>
            <div className='w-full mr-4'>
              <input
                className='block w-full rounded-md border-0 px-2 py-1.5 bg-white text-black ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600'
                value={createMessage}
                onChange={(e) => setCreateMessage(e.target.value)}
              />
            </div>
            <div>
              <Button
                label={'Send'}
                onClick={() => onSendMessage()}
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
