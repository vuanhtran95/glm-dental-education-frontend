import { useAudioRecorder } from 'react-audio-voice-recorder';
// ...
// ...
const {
  startRecording,
  stopRecording,
  togglePauseResume,
  recordingBlob,
  isRecording,
  isPaused,
  recordingTime,
  mediaRecorder,
} = useAudioRecorder();

useEffect(() => {
  if (!recordingBlob) return;

  // recordingBlob will be present at this point after 'stopRecording' has been called
}, [recordingBlob]);
