import { Gender } from "src/store/scenario/types";
import { ScenarioGenerateForm } from "./types";

export const generateScenarioInitialValues: ScenarioGenerateForm = {
  patientName: "",
  gender: Gender.MALE,
};

export const genderOptions = [
  { key: Gender.MALE, label: Gender.MALE },
  { key: Gender.FEMALE, label: Gender.FEMALE },
];
