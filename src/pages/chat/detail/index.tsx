import { useParams } from "react-router-dom";

declare global {
  interface Window {
    responsiveVoice: any;
  }
}
import { useAudioRecorder } from "react-audio-voice-recorder";

import MessageBox from "../../../components/message-box/message-box";
import { useCallback, useEffect, useMemo, useState } from "react";
import { EMessageRole } from "../../../store/dialog/types";
import ScenarioInformation from "./components/scenario-information";
import { makeS3Uri } from "./utils";
import useDialogDetail from "src/hooks/useDialogDetail";
import VoiceInput from "./components/voice-input";
import useAmazonS3 from "src/hooks/useAmazonS3";
import useMessage from "src/hooks/useMessage";
import useSpeechToText from "src/hooks/useSpeechToText";
import { Gender } from "src/store/scenario/types";
import StatusGroup from "./components/status-group";
import { UserRole } from "src/store/user/types";
import useAllowedRoles from "src/hooks/useUserRole";
import useResponsive from "src/hooks/useResponsive";
import { useElevenLabs } from "src/hooks/useElevenLabs";

const ChatDetail = () => {
  const params = useParams();

  const dialogId = params.id;

  const { uploadBlob } = useAmazonS3();
  const { isMobile } = useResponsive();

  const { recordingBlob, startRecording, stopRecording } = useAudioRecorder();

  const [isSending, setIsSending] = useState(false);

  const {
    startListening,
    stopListening,
    transcript,
    resetTranscript,
    listening,
  } = useSpeechToText({});

  const { scenario, messages, fetchDialogDetail, dialogDetail, isLoading } =
    useDialogDetail({
      dialogId,
    });

  const { createMessage } = useMessage({
    dialogId,
  });

  // const { onSpeak } = useTextToSpeech(scenario?.gender === Gender.MALE);

  const { onSpeakStream: onSpeakElevenLabs } = useElevenLabs(
    scenario?.gender === Gender.MALE ? Gender.MALE : Gender.FEMALE,
  );

  const refetch = useCallback(async () => {
    fetchDialogDetail((text: string) => {
      // onSpeak(text);
      onSpeakElevenLabs(text);
    });
  }, [fetchDialogDetail, onSpeakElevenLabs]);

  const onCreateMessage = useCallback(
    async (newMessage: string, uri?: string, callback?: () => void) => {
      if (!dialogId) return;

      try {
        createMessage({ content: newMessage, uri }, () => {
          callback?.();
          refetch();
        });
      } catch (e) {
        console.error(e);
      }
    },
    [createMessage, dialogId, refetch],
  );

  const onClickSend = useCallback(async () => {
    if (!recordingBlob) return;

    setIsSending(true);

    const s3Id = await uploadBlob(recordingBlob);
    const uri = makeS3Uri(s3Id);

    await onCreateMessage(transcript, uri, () => {
      setIsSending(false);
    });

    resetTranscript();
  }, [uploadBlob, recordingBlob, onCreateMessage, transcript, resetTranscript]);

  const displayedMessages = useMemo(() => {
    return messages?.filter((e) => e.role !== EMessageRole.SYSTEM) || [];
  }, [messages]);

  useAllowedRoles([UserRole.STUDENT]);

  useEffect(() => {
    fetchDialogDetail(() => {}, true);
  }, [fetchDialogDetail]);

  return (
    <div className="flex flex-col md:flex-row h-full w-full">
      <div className="detail-container flex flex-col h-full md:ml-[260px] w-full">
        <MessageBox messages={displayedMessages} isLoading={isLoading} />
        <div id="record-input" className="w-full px-2 pb-1 relative">
          <StatusGroup dialogDetail={dialogDetail} />
          {!dialogDetail?.isEnded && !dialogDetail?.isSubmitted && (
            <VoiceInput
              transcript={transcript}
              listening={listening}
              stopListening={stopListening}
              stopRecording={stopRecording}
              resetTranscript={resetTranscript}
              startListening={startListening}
              startRecording={startRecording}
              onSend={onClickSend}
              isLoading={isLoading}
              isSending={isSending}
            />
          )}
        </div>
      </div>
      {!isMobile && (
        <ScenarioInformation
          dialogDetail={dialogDetail}
          scenario={scenario}
          messages={messages}
        />
      )}
    </div>
  );
};

export default ChatDetail;
