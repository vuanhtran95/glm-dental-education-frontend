import { Gender } from "src/store/scenario/types";
import { ScenarioGenerateForm } from "./types";

export const generateScenarioInitialValues: ScenarioGenerateForm = {
  patientName: "",
  gender: Gender.FEMALE,
  presentingComplaint: "",
  emotionalState: "Neutral",
  clinicalContext: "",
  // Optional
  medicalHistory: "",
  dateOfBirth: "",
  occupation: "",
  lifeStyle: "",
  personalTraits: "",
  verbosityLevel: 3,
  objectiveForStudent: "",
};

export const genderOptions = [
  { key: Gender.MALE, label: Gender.MALE },
  { key: Gender.FEMALE, label: Gender.FEMALE },
];

export const verbosityLevelOptions = [
  { key: 1, label: "1" },
  { key: 2, label: "2" },
  { key: 3, label: "3" },
  { key: 4, label: "4" },
  { key: 5, label: "5" },
];

export const emotionalStateOptions = [
  { key: "neutral", label: "Neutral" },
  { key: "calm", label: "Calm" },
  { key: "nervous", label: "Nervous" },
  { key: "anxious", label: "Anxious" },
  { key: "irritated", label: "Irritated" },
  { key: "frustrated", label: "Frustrated" },
  { key: "confused", label: "Confused" },
  { key: "distracted", label: "Distracted" },
  { key: "focused", label: "Focused" },
  { key: "angry", label: "Angry" },
  { key: "happy", label: "Happy" },
  { key: "sad", label: "Sad" },
  { key: "fearful", label: "Fearful" },
];
