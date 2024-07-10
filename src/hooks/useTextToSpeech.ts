const synth = window.speechSynthesis;

const useTextToSpeech = (isMale: boolean) => {
  const onSpeak = (text: string) => {
    return new Promise((resolve) => {
      const utterThis = new SpeechSynthesisUtterance(text);
      utterThis.voice = synth.getVoices()[isMale ? 1 : 159];
      utterThis.pitch = 1;
      utterThis.rate = 1;
      synth.speak(utterThis);
      utterThis.onend = resolve;
    });
  };

  return {
    onSpeak,
  };
};

export default useTextToSpeech;
