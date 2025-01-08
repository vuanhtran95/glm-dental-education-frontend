import { Gender } from "src/store/scenario/types";

export interface ScenarioGenerateForm {
  patientName: string;
  gender: Gender;
  clinicalContext: string;
  medicalHistory: string;
  mentalState: string;
}
