import { useParams } from 'react-router-dom';
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';

import MessageBox from '../../../components/message-box/message-box';
import useDialogDetail from '../../../hooks/useDialogDetail';
import { useCallback, useEffect } from 'react';
import Header from '../../../components/header';
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
import Input from '../../../components/input';

const DialogDetail = () => {
  const params = useParams();

  const dialogId = params.id;

  const isSentMessage = useSelector(selectIsSentMessage);

  const { isMobile } = useResponsive();
  const { uploadBlob } = useAmazonS3();
  const { processMessage } = useCallToLlama();
  const { createMessage } = useMessage({ dialogId });

  const recorderControls = useAudioRecorder();

  const { startRecording, stopRecording } = recorderControls;

  const { startListening, stopListening, transcript, resetTranscript } =
    useSpeechToText({});

  const { dialogDetail, fetchDialogDetail } = useDialogDetail({
    dialogId,
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const messages = dialogDetail?.detail.messages || [];

  const dialog = dialogDetail?.detail.dialog;
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

  const onRecordingComplete = useCallback(
    async (blob: Blob) => {
      const s3Id = await uploadBlob(blob);
      const uri = makeS3Uri(s3Id);
      onSendMessage(transcript, uri);
    },
    [onSendMessage, transcript, uploadBlob]
  );

  useEffect(() => {
    fetchDialogDetail();
  }, [fetchDialogDetail]);

  useEffect(() => {
    if (isSentMessage) {
      const lastMessage = messages[messages.length - 1];
      const audio = new Audio(lastMessage.uri);

      audio.play();
    }
  }, [isSentMessage, messages]);

  return (
    <>
      <Header title={`Dialog: ${dialog?.name || ''}`} />
      <div className='flex flex-row gap-x-36 mt-8'>
        <div className='grow p-2'>
          <div className='w-full border p-4'>
            <MessageBox
              messages={
                messages?.filter((e) => e.role !== EMessageRole.SYSTEM) || []
              }
            />
          </div>

          <div className='flex justify-center items-end	mt-4'>
            <AudioRecorder
              recorderControls={{
                ...recorderControls,
                startRecording: () => {
                  resetTranscript();
                  startListening({ continuous: true });
                  startRecording();
                },
                stopRecording: () => {
                  stopListening();
                  stopRecording();
                },
              }}
              showVisualizer={false}
              onRecordingComplete={onRecordingComplete}
            />
          </div>
        </div>
        {!isMobile && <ScenarioInformation scenario={scenario} />}
      </div>
    </>
  );
};

export default DialogDetail;
