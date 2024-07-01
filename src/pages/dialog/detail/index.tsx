import { useParams } from 'react-router-dom';
import MessageBox from '../../../components/message-box/message-box';
import useDialogDetail from '../../../hooks/useDialogDetail';
import { useCallback, useEffect, useState } from 'react';
import Header from '../../../components/header';
import Button from '../../../components/button';
import { EMessageRole } from '../../../store/dialog/types';
import useResponsive from '../../../hooks/useResponsive';
import useSpeechToText from '../../../hooks/useSpeechToText';
import useCallToLlama from '../../../hooks/useCallToLlama';
import useMessage from '../../../hooks/useMessage';

const DialogDetail = () => {
  const params = useParams();

  const dialogId = params.id;

  const { isMobile } = useResponsive();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [textMessage, setTextMessage] = useState<string>('');

  const { createMessage } = useMessage({ dialogId });

  const { processMessage } = useCallToLlama();

  const { dialogDetail, fetchDialogDetail } = useDialogDetail({
    dialogId,
  });

  const {
    startListening,
    stopListening,
    transcript,
    listening: isListening,
    resetTranscript,
  } = useSpeechToText({ transcribing: true });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const messages = dialogDetail?.detail.messages || [];

  const dialog = dialogDetail?.detail.dialog;
  const scenario = dialogDetail?.detail.scenario;

  const onSendMessage = useCallback(
    async (newMessage: string) => {
      setIsLoading(true);
      if (!dialogId) return;

      try {
        const responseMessage = await processMessage(newMessage, messages);
        console.log(responseMessage, 'responseMessage');

        createMessage(
          [
            { role: EMessageRole.USER, content: newMessage },
            { role: EMessageRole.ASSISTANT, content: responseMessage },
          ],
          () => {
            setTextMessage('');
            setIsLoading(false);
            fetchDialogDetail();
          },
          () => {
            setIsLoading(false);
          }
        );
      } catch (e) {
        console.error(e);
      }
    },
    [createMessage, dialogId, fetchDialogDetail, messages, processMessage]
  );

  const onClickListen = useCallback(() => {
    if (isListening) {
      stopListening();
      onSendMessage(transcript);
    } else {
      resetTranscript();
      startListening({ continuous: true });
    }
  }, [
    isListening,
    onSendMessage,
    resetTranscript,
    startListening,
    stopListening,
    transcript,
  ]);

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
            <div className='w-full'>
              <input
                className='block w-full rounded-md border-0 px-2 py-1.5 bg-white text-black ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600'
                value={textMessage}
                onChange={(e) => {
                  setTextMessage(e.target.value);
                }}
              />
            </div>
            {textMessage ? (
              <Button
                label={'Send'}
                onClick={() => onSendMessage(textMessage)}
                loading={isLoading}
                className='ml-2'
              />
            ) : (
              <Button
                label={isListening ? 'Listening' : 'Listen'}
                onClick={() => onClickListen()}
                className='ml-2'
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DialogDetail;
