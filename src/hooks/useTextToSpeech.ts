import { useState } from 'react';

const synth = window.speechSynthesis;

const useTextToSpeech = () => {
  const [voiceId, setVoiceId] = useState<number>(1);

  const onSpeak = (text: string) => {
    return new Promise((resolve) => {
      if (voiceId < 0) return;
      const utterThis = new SpeechSynthesisUtterance(text);
      utterThis.voice = synth.getVoices()[voiceId];
      utterThis.pitch = 1;
      utterThis.rate = 1;
      synth.speak(utterThis);
      utterThis.onend = resolve;
    });
  };

  return {
    onSpeak,
    setVoiceId,
  };
};

export default useTextToSpeech;
