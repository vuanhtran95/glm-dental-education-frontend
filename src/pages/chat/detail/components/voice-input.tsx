import { useCallback, useMemo } from "react";
import {
  recordButtonCss,
  removeButtonCss,
  sendButtonCss,
  transcriptInputCss,
} from "../constants";
import useResponsive from "src/hooks/useResponsive";

interface Props {
  transcript: string;
  listening: boolean;
  stopListening: () => void;
  stopRecording: () => void;
  resetTranscript: () => void;
  startListening: (params: any) => void;
  startRecording: () => void;
  onRemove: () => void;
  onSend: () => void;
}

const VoiceInput = ({
  transcript,
  listening,
  stopListening,
  stopRecording,
  resetTranscript,
  startListening,
  startRecording,
  onRemove,
  onSend,
}: Props) => {

  const { isMobile } = useResponsive();

  const onClickRecordButton = useCallback(() => {
    if (listening) {
      stopListening();
      stopRecording();
    } else {
      resetTranscript();
      startListening({ continuous: true });
      startRecording();
    }
  }, [
    listening,
    resetTranscript,
    startListening,
    startRecording,
    stopListening,
    stopRecording,
  ]);

  const shouldShowRecordButton = useMemo(
    () => !transcript || listening,
    [listening, transcript],
  );

  const numberOfRow = useMemo(() => {
    // Desktop
    if (!isMobile) {
      return 1;
    }

    // Mobile
    const count = transcript.split("\n").length;
    return count > 1 ? count : 1;
  }, [transcript, isMobile]);

  console.log(transcript, 'transcript');

  return (
    <div id="voice-input" className="bg-gray-500 rounded-2xl" onClick={() => onClickRecordButton()}>
      <textarea 
        rows={numberOfRow}
        className={transcriptInputCss} 
        value={transcript}
        disabled
      />
      <div className="flex justify-end pb-1 pr-1">
        {shouldShowRecordButton && (
          <button
            onClick={() => onClickRecordButton()}
            type="submit"
            className={recordButtonCss(listening)}
          >
            {/* {listening ? "Stop" : "Record"} */}
            <i className="fa-solid fa-microphone"></i>
          </button>
        )}
        {!shouldShowRecordButton && (
          <>
            <button onClick={() => onRemove()} className={removeButtonCss}>
              <i className="fa-solid fa-xmark"></i>
            </button>
            <button onClick={() => onSend()} className={sendButtonCss}>
              <i className="fa-solid fa-paper-plane"></i>
            </button>
          </>
        )}
      </div>
      
    </div>
  );
};

export default VoiceInput;
