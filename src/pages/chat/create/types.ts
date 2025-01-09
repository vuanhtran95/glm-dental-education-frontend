import { Gender } from "src/store/scenario/types";

export interface ScenarioGenerateForm {
  // General
  patientName: string;
  gender: Gender;
  dateOfBirth: string;
  occupation: string;

  // Clinical context
  presentingComplaint: string; // reason for visit
  medicalHistory: string;
  lifeStyle: string;

  // Personality and communication
  emotionalState: string;
  personalTraits: string;
  communicationStyle: string;

  // Clinical context
  clinicalContext: string;

  // Objective
  objectiveForStudent: string;
}
