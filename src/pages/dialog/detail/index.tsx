import { useParams } from 'react-router-dom';
import { useAudioRecorder } from 'react-audio-voice-recorder';

import MessageBox from '../../../components/message-box/message-box';
import useDialogDetail from '../../../hooks/useDialogDetail';
import { useCallback, useEffect, useState } from 'react';
import { EMessageRole } from '../../../store/dialog/types';
import useResponsive from '../../../hooks/useResponsive';
import useCallToLlama from '../../../hooks/useCallToLlama';
import useMessage from '../../../hooks/useMessage';
import useAmazonS3 from '../../../hooks/useAmazonS3';
import ScenarioInformation from './components/scenario-information';
import useSpeechToText from '../../../hooks/useSpeechToText';
import { makeS3Uri } from './utils';
import { useSelector } from 'react-redux';
import { selectIsSentMessage } from '../../../store/dialog/selectors';
import useTextToSpeech from '../../../hooks/useTextToSpeech';

const DialogDetail = () => {
  const params = useParams();

  const dialogId = params.id;

  const isSentMessage = useSelector(selectIsSentMessage);

  const [isShowProfile, setIsShowProfile] = useState<boolean>(false);

  const { isMobile } = useResponsive();
  const { uploadBlob } = useAmazonS3();
  const { processMessage } = useCallToLlama();
  const { createMessage } = useMessage({ dialogId });

  const { recordingBlob, startRecording, stopRecording, isRecording } =
    useAudioRecorder();

  const {
    startListening,
    stopListening,
    transcript,
    resetTranscript,
    listening,
  } = useSpeechToText({});

  const onClickProfile = useCallback(() => {
    setIsShowProfile(!isShowProfile);
  }, [isShowProfile]);

  const { onSpeak } = useTextToSpeech();

  const { dialogDetail, fetchDialogDetail } = useDialogDetail({
    dialogId,
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const messages = dialogDetail?.detail.messages || [];

  const scenario = dialogDetail?.detail.scenario;

  const refetch = useCallback(async () => {
    fetchDialogDetail(true);
  }, [fetchDialogDetail]);

  const onSendMessage = useCallback(
    async (newMessage: string, uri?: string) => {
      if (!dialogId) return;

      try {
        const responseMessage = await processMessage(newMessage, messages);
        createMessage(
          [
            { role: EMessageRole.USER, content: newMessage, uri },
            { role: EMessageRole.ASSISTANT, content: responseMessage },
          ],
          () => {
            refetch();
          }
        );
      } catch (e) {
        console.error(e);
      }
    },
    [createMessage, dialogId, messages, processMessage, refetch]
  );

  const onSend = useCallback(async () => {
    const s3Id = await uploadBlob(recordingBlob);
    const uri = makeS3Uri(s3Id);
    onSendMessage(transcript, uri);
    resetTranscript();
  }, [uploadBlob, recordingBlob, onSendMessage, transcript, resetTranscript]);

  const onRemove = useCallback(() => {
    resetTranscript();
  }, [resetTranscript]);

  useEffect(() => {
    fetchDialogDetail();
  }, [fetchDialogDetail]);

  useEffect(() => {
    if (isSentMessage) {
      onSpeak(messages[messages.length - 1].content);
    }
  }, [isSentMessage, messages, onSpeak]);

  return (
    <div className='flex flex-row min-h-screen'>
      <div className='grow bg-slate-500'>
        <div className='w-full'>
          <MessageBox
            onClickProfile={onClickProfile}
            messages={
              messages?.filter((e) => e.role !== EMessageRole.SYSTEM) || []
            }
          />
        </div>

        <div className='flex justify-center items-end	mt-4'>
          <div className='hidden'></div>
          <div className='sticky md:relative w-full px-8'>
            <input
              className='block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              id='symptoms'
              name='symptoms'
              value={transcript}
              disabled
            />
            {(!transcript || listening) && (
              <button
                onClick={() => {
                  if (isRecording) {
                    stopListening();
                    stopRecording();
                  } else {
                    resetTranscript();
                    startListening({ continuous: true });
                    startRecording();
                  }
                }}
                type='submit'
                className={`text-white absolute end-10 bottom-2.5 ${
                  isRecording
                    ? 'bg-red-700 dark:hover:bg-red-700 dark:focus:ring-red-800 hover:bg-red-800 focus:ring-red-300'
                    : 'bg-blue-700  dark:hover:bg-blue-700 dark:focus:ring-blue-800 hover:bg-blue-800 focus:ring-blue-300'
                } focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-4 py-2
                `}
              >
                {isRecording ? 'Stop' : 'Record'}{' '}
                <i className='fa-solid fa-microphone'></i>
              </button>
            )}

            {!!transcript && !listening && (
              <>
                <button
                  onClick={() => onRemove()}
                  className='mr-4 bg-red-700 dark:hover:bg-red-700 dark:focus:ring-red-800 hover:bg-red-800 focus:ring-red-300 absolute text-white end-20 bottom-2.5 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-4 py-2'
                >
                  <i className='fa-solid fa-xmark'></i>
                </button>
                <button
                  onClick={() => onSend()}
                  className='bg-green-700 dark:hover:bg-green-700 dark:focus:ring-green-800 hover:bg-green-800 focus:ring-green-300 absolute text-white end-10 bottom-2.5 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-4 py-2'
                >
                  <i className='fa-solid fa-paper-plane'></i>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      {!isMobile && isShowProfile && (
        <ScenarioInformation scenario={scenario} />
      )}
    </div>
  );
};

export default DialogDetail;
