import { useCallback, useMemo } from "react";
import {
  recordButtonCss,
  removeButtonCss,
  sendButtonCss,
  transcriptInputCss,
} from "../constants";

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
    const count = transcript.split("\n").length;
    return count > 1 ? count : 1;
  }, [transcript])

  return (
    <>
      <div className="relative">
        <textarea rows={numberOfRow} className={transcriptInputCss} value={transcript} disabled />
      </div>
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
    </>
  );
};

export default VoiceInput;
