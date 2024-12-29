import { useParams } from "react-router-dom";

declare global {
  interface Window {
    responsiveVoice: any;
  }
}
import { useAudioRecorder } from "react-audio-voice-recorder";

import MessageBox from "../../../components/message-box/message-box";
import { useCallback, useEffect, useMemo } from "react";
import { EMessageRole } from "../../../store/dialog/types";
import ScenarioInformation from "./components/scenario-information";
import { makeS3Uri } from "./utils";
import useDialogDetail from "src/hooks/useDialogDetail";
import VoiceInput from "./components/voice-input";
import useAmazonS3 from "src/hooks/useAmazonS3";
import useMessage from "src/hooks/useMessage";
import useSpeechToText from "src/hooks/useSpeechToText";
import useTextToSpeech from "src/hooks/useTextToSpeech";
import { Gender } from "src/store/scenario/types";
import StatusGroup from "./components/status-group";
import { UserRole } from "src/store/user/types";
import useAllowedRoles from "src/hooks/useUserRole";

const ChatDetail = () => {
  const params = useParams();

  const dialogId = params.id;

  const { uploadBlob } = useAmazonS3();
  const { createMessage } = useMessage({ dialogId });

  const { recordingBlob, startRecording, stopRecording } = useAudioRecorder();

  const {
    startListening,
    stopListening,
    transcript,
    resetTranscript,
    listening,
  } = useSpeechToText({});

  const { scenario, messages, fetchDialogDetail, dialogDetail } =
    useDialogDetail({
      dialogId,
    });

  const { onSpeak } = useTextToSpeech(scenario?.gender === Gender.MALE);

  const refetch = useCallback(async () => {
    fetchDialogDetail((text: string) => {
      if (window.responsiveVoice) {
        window.responsiveVoice.speak(text);
      }
    });
  }, [fetchDialogDetail, onSpeak]);

  const onCreateMessage = useCallback(
    async (newMessage: string, uri?: string) => {
      if (!dialogId) return;
      
      try {
        createMessage({ content: newMessage, uri }, refetch);
      } catch (e) {
        console.error(e);
      }
    },
    [createMessage, dialogId, refetch],
  );

  const onClickSend = useCallback(async () => {
    if (!recordingBlob) return;
    const s3Id = await uploadBlob(recordingBlob);
    const uri = makeS3Uri(s3Id);

    onCreateMessage(transcript, uri);
    resetTranscript();
  }, [uploadBlob, recordingBlob, onCreateMessage, transcript, resetTranscript]);

  const onClickRemove = useCallback(() => {
    resetTranscript();
  }, [resetTranscript]);

  const displayedMessages = useMemo(() => {
    return messages?.filter((e) => e.role !== EMessageRole.SYSTEM) || [];
  }, [messages]);

  useAllowedRoles([UserRole.STUDENT]);

  useEffect(() => {
    fetchDialogDetail();
  }, [fetchDialogDetail]);

  return (
    <div className="detail-container flex flex-col h-full">
      <MessageBox
        shouldShowFeedback={!!dialogDetail?.isSubmitted}
        isMale={scenario?.gender === Gender.MALE}
        messages={displayedMessages}
      />
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
            onRemove={onClickRemove}
            onSend={onClickSend}
          />
        )}
      </div>
      {false && (
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
