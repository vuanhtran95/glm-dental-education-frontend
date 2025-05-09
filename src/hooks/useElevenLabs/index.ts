// @ts-nocheck
import { ElevenLabsClient } from "elevenlabs";
import { useState } from "react";
import {
  ensureLastWordIncluded,
  getVoiceId,
  processNormalizedAlignment,
  processOldAlignment,
  processTimestamps,
} from "./utils";

export enum Gender {
  MALE = "Male",
  FEMALE = "Female",
}

// @ts-ignore
const apiKey = import.meta.env.VITE_ELEVEN_LABS_KEY;

export const useElevenLabs = (
  gender: Gender = Gender.MALE,
  setAudioLoading?: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const client = new ElevenLabsClient({ apiKey });
  const voiceId = getVoiceId(gender);
  const [isPlaying, setIsPlaying] = useState(false);

  const onSpeakStream = (
    message: string,
    onWordSpoken?: () => void,
    onFinish?: () => void,
  ) => {
    client.textToSpeech
      .streamWithTimestamps(voiceId, {
        output_format: "mp3_44100_128",
        text: message,
        model_id: "eleven_multilingual_v2",
      })
      .then(async (stream) => {
        // Parse the message into words for tracking
        const words = message.split(/\s+/).filter((word) => word.length > 0);

        // Collect all chunks first to build complete timing data
        const chunks: any = [];
        const wordTimings: any = [];

        try {
          // First pass: collect all chunks and extract timing information
          for await (const chunk of stream) {
            chunks.push(chunk);

            // Process timestamps to build word timing data
            if (
              chunk.character_end_timestamps &&
              chunk.character_end_timestamps.length > 0
            ) {
              processTimestamps(
                chunk.character_end_timestamps,
                message,
                words,
                wordTimings,
              );
            } else if (
              chunk.normalized_alignment &&
              chunk.normalized_alignment.chars
            ) {
              // Handle normalized alignment if available
              processNormalizedAlignment(
                chunk.normalized_alignment,
                message,
                words,
                wordTimings,
              );
            } else if (chunk.alignment && chunk.alignment.characters) {
              // Handle older API version alignment
              processOldAlignment(chunk.alignment, message, words, wordTimings);
            }
          }

          // Ensure the last word is included
          ensureLastWordIncluded(words, wordTimings, chunks);

          // Create MediaSource
          const mediaSource = new MediaSource();
          const audio = new Audio();
          audio.src = URL.createObjectURL(mediaSource);

          // Set up audio event listeners
          audio.addEventListener("play", () => setIsPlaying(true));
          audio.addEventListener("pause", () => setIsPlaying(false));
          audio.addEventListener("ended", () => {
            setIsPlaying(false);
            if (onFinish) {
              onFinish();
            }
          });

          mediaSource.addEventListener("sourceopen", async () => {
            const mime = "audio/mpeg";
            const sourceBuffer = mediaSource.addSourceBuffer(mime);

            // Start audio playback
            audio.oncanplaythrough = () => {
              // Turn off audio loading when audio is ready to play
              if (setAudioLoading) {
                setAudioLoading(false);
              }

              audio
                .play()
                .catch((err) => console.error("Audio play error:", err));

              // Set up timers for each word based on its timestamp
              wordTimings.forEach((timing) => {
                setTimeout(() => {
                  // Trigger the onWordSpoken callback when any word is spoken
                  if (onWordSpoken) {
                    onWordSpoken();
                  }
                }, timing.timeMs);
              });
            };

            // Process all audio chunks
            for (const chunk of chunks) {
              if (chunk.audio_base64) {
                try {
                  // Convert base64 to buffer
                  const audioData = atob(chunk.audio_base64);
                  const arrayBuffer = new ArrayBuffer(audioData.length);
                  const view = new Uint8Array(arrayBuffer);

                  for (let i = 0; i < audioData.length; i++) {
                    view[i] = audioData.charCodeAt(i);
                  }

                  // Wait if the sourceBuffer is updating
                  while (sourceBuffer.updating) {
                    await new Promise((resolve) => setTimeout(resolve, 50));
                  }

                  // Append audio chunk to the source buffer
                  sourceBuffer.appendBuffer(arrayBuffer);
                } catch (error) {
                  console.error("Error processing audio data:", error);
                  if (setAudioLoading) {
                    setAudioLoading(false);
                  }
                }
              }
            }

            // End the stream once we're done
            try {
              if (sourceBuffer.updating) {
                await new Promise<void>((resolve) => {
                  sourceBuffer.addEventListener("updateend", () => resolve(), {
                    once: true,
                  });
                });
              }
              mediaSource.endOfStream();
            } catch (endError) {
              console.error("Error ending stream:", endError);
              if (setAudioLoading) {
                setAudioLoading(false);
              }
            }
          });
        } catch (streamError) {
          console.error("Error processing stream:", streamError);
          if (setAudioLoading) {
            setAudioLoading(false);
          }
        }
      })
      .catch((error) => {
        console.error("Error streaming audio:", error);
        if (setAudioLoading) {
          setAudioLoading(false);
        }
      });
  };

  return { onSpeakStream, isPlaying };
};
