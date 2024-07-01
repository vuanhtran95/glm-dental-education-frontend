import 'regenerator-runtime/runtime';
import SpeechRecognition, {
  SpeechRecognitionOptions,
  useSpeechRecognition,
} from 'react-speech-recognition';

const useSpeechToText = (options?: SpeechRecognitionOptions) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    interimTranscript,
    finalTranscript,
    isMicrophoneAvailable,
  } = useSpeechRecognition(options);

  return {
    startListening: SpeechRecognition.startListening,
    stopListening: SpeechRecognition.stopListening,
    resetTranscript,
    transcript,
    listening,
    browserSupportsSpeechRecognition,
    interimTranscript,
    finalTranscript,
    isMicrophoneAvailable,
  };
};
export default useSpeechToText;
