import { useCallback, useMemo, useState } from "react";
import { transcriptInputCss } from "../constants";
import useResponsive from "src/hooks/useResponsive";
import { MicrophoneMode } from "src/types";

interface Props {
  transcript: string;
  listening: boolean;
  stopListening: () => void;
  stopRecording: () => void;
  resetTranscript: () => void;
  startListening: (params: any) => void;
  startRecording: () => void;
  onSend: () => Promise<void>;
  isLoading: boolean;
  isSending: boolean;
}

const VoiceInput = ({
  transcript,
  listening,
  stopListening,
  stopRecording,
  resetTranscript,
  startListening,
  startRecording,
  onSend,
  isLoading,
  isSending,
}: Props) => {
  const { isMobile } = useResponsive();

  const [mode, setMode] = useState<MicrophoneMode>(MicrophoneMode.IDLE);

  const onClickRecord = useCallback(() => {
    resetTranscript();
    startListening({ continuous: true });
    startRecording();
    setMode(MicrophoneMode.RECORDING);
    // }
  }, [listening, resetTranscript, startListening, startRecording]);

  const onClickStop = useCallback(() => {
    setMode(MicrophoneMode.READY);
    stopListening();
    stopRecording();
  }, [stopListening, stopRecording]);

  const onClickClear = useCallback(() => {
    setMode(MicrophoneMode.IDLE);
    resetTranscript();
  }, [resetTranscript]);

  const onClickSend = useCallback(async () => {
    stopListening();
    stopRecording();
    setMode(MicrophoneMode.SENDING);
    onSend().then(() => {
      resetTranscript();
      setMode(MicrophoneMode.IDLE);
    });
  }, [onSend, setMode]);

  const numberOfRow = useMemo(() => {
    // Desktop
    if (!isMobile) {
      return 2;
    }

    // Mobile
    return Math.round(transcript.length / 48) + 1;
  }, [transcript, isMobile]);

  return (
    <div id="voice-input" className="bg-gray-700 rounded-2xl">
      <textarea
        rows={numberOfRow}
        className={transcriptInputCss}
        value={transcript}
        disabled
      />
      <div className="flex justify-end pb-1 pr-1 text-white text-xs">
        {!isLoading && (
          <>
            {mode === MicrophoneMode.IDLE && !isSending && (
              <button
                onClick={() => onClickRecord()}
                type="submit"
                className="bg-blue-600 rounded-2xl"
              >
                <i className="fa-solid fa-microphone"></i>
              </button>
            )}
            {mode === MicrophoneMode.RECORDING && (
              <>
                <button
                  onClick={() => onClickClear()}
                  className="bg-red-700 rounded-2xl"
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
                <button
                  onClick={() => onClickStop()}
                  className="bg-black-700 rounded-2xl ml-2"
                >
                  <i className="fa-solid fa-stop"></i>
                </button>
              </>
            )}
            {mode === MicrophoneMode.READY && (
              <>
                <button
                  onClick={() => onClickClear()}
                  className="bg-red-700 rounded-2xl"
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
                <button
                  onClick={() => onClickSend()}
                  className="bg-green-700 rounded-2xl ml-2"
                >
                  <i className="fa-solid fa-paper-plane"></i>
                </button>
              </>
            )}

            {(mode === MicrophoneMode.SENDING || isSending) && (
              <>
                <button
                  onClick={() => onClickSend()}
                  className="bg-green-700 rounded-2xl ml-2"
                >
                  <i className="fas fa-spinner fa-spin"></i>
                </button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default VoiceInput;
