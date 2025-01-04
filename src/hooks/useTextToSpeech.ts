import useSpeechToText from "./useSpeechToText";

export enum VoiceTypes {
  MALE = "UK English Male",
  FEMALE = "UK English Female",
}

const useTextToSpeech = (isMale: boolean) => {
  const { stopListening } = useSpeechToText({});

  const onSpeak = (text: string) => {
    if (window.responsiveVoice) {
      stopListening();
      window.responsiveVoice.speak(
        text,
        isMale ? VoiceTypes.MALE : VoiceTypes.FEMALE,
      );
    }
  };

  return {
    onSpeak,
  };
};

export default useTextToSpeech;
