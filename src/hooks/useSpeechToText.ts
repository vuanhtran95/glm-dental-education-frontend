import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';

const useSpeechToText = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  return {
    startListening: SpeechRecognition.startListening,
    stopListening: SpeechRecognition.stopListening,
    reset: resetTranscript,
    transcript,
    listening,
    browserSupportsSpeechRecognition,
  };
};
export default useSpeechToText;
