// @ts-nocheck
import { Gender } from "./index";

// Currently hardcoding the voiceId for the sake of the example
export const getVoiceId = (gender: Gender) => {
  return gender === Gender.MALE
    ? "JBFqnCBsd6RMkjVDRZzb"
    : "Xb7hH8MSUJpSbSDYk0k2";
};
// Helper function to ensure the last word is included in the timings
export function ensureLastWordIncluded(words, wordTimings, chunks) {
  if (words.length > wordTimings.length) {
    // Find the last chunk with timestamp data
    for (let i = chunks.length - 1; i >= 0; i--) {
      const chunk = chunks[i];
      let lastTimestamp = null;

      if (
        chunk.character_end_timestamps &&
        chunk.character_end_timestamps.length > 0
      ) {
        lastTimestamp =
          chunk.character_end_timestamps[
            chunk.character_end_timestamps.length - 1
          ];
      } else if (
        chunk.normalized_alignment &&
        chunk.normalized_alignment.char_end_times_seconds
      ) {
        const times = chunk.normalized_alignment.char_end_times_seconds;
        lastTimestamp = { time_ms: times[times.length - 1] * 1000 };
      } else if (
        chunk.alignment &&
        chunk.alignment.character_end_times_seconds
      ) {
        const times = chunk.alignment.character_end_times_seconds;
        lastTimestamp = { time_ms: times[times.length - 1] * 1000 };
      }

      if (lastTimestamp) {
        // Add the last word with the timing of the last character
        wordTimings.push({
          timeMs: lastTimestamp.time_ms,
        });
        break;
      }
    }
  }
}

// Helper function to process character_end_timestamps
export function processTimestamps(timestamps, message, words, wordTimings) {
  let lastSpaceIndex = -1;
  let currentWordIndex = 0;

  for (const timestamp of timestamps) {
    // If we find a space, it marks the end of a word
    if (
      timestamp.character === " " &&
      timestamp.character_index > lastSpaceIndex
    ) {
      lastSpaceIndex = timestamp.character_index;

      if (currentWordIndex < words.length) {
        // Store the timing of the word
        wordTimings.push({
          timeMs: timestamp.time_ms,
        });
        currentWordIndex++;
      }
    }
  }
}

// Helper function to process normalized_alignment
export function processNormalizedAlignment(
  alignment,
  message,
  words,
  wordTimings,
) {
  if (!alignment.chars || !alignment.char_end_times_seconds) return;

  const charArray = alignment.chars;
  let lastSpaceIndex = -1;
  let currentWordIndex = 0;

  for (let i = 0; i < charArray.length; i++) {
    if (charArray[i] === " " && i > lastSpaceIndex) {
      lastSpaceIndex = i;

      if (currentWordIndex < words.length) {
        wordTimings.push({
          timeMs: alignment.char_end_times_seconds[i] * 1000,
        });
        currentWordIndex++;
      }
    }
  }
}

// Helper function to process old alignment format
// @ts-ignore
export function processOldAlignment(alignment, message, words, wordTimings) {
  if (!alignment.characters || !alignment.character_end_times_seconds) return;

  const characters = alignment.characters;
  let lastSpaceIndex = -1;
  let currentWordIndex = 0;

  for (let i = 0; i < characters.length; i++) {
    if (characters[i] === " " && i > lastSpaceIndex) {
      lastSpaceIndex = i;

      if (currentWordIndex < words.length) {
        wordTimings.push({
          timeMs: alignment.character_end_times_seconds[i] * 1000,
        });
        currentWordIndex++;
      }
    }
  }
}
