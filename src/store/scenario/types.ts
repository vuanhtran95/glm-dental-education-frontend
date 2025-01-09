import { ErrorCallback, SuccessCallback } from "../../types";
import { SCENARIO_GENERATE } from "./actionTypes";

export interface ScenarioState {
  scenarioDetail: ScenarioDetail | null;
}

export enum Gender {
  MALE = "Male",
  FEMALE = "Female",
}

export interface ScenarioDetail {
  _id: string;
  // general
  patientName: string;
  dateOfBirth: string;
  gender: Gender;
  occupation: string;

  // clinical context
  presentingComplaint: string;
  medicalHistory: string;
  lifeStyle?: string;

  // Personal
  mentalState: string;
  personalTraits: string;
  communicationStyle: string;

  // Additional
  clinicalContext: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
}

export interface ScenarioDetailGenerateAction {
  type: typeof SCENARIO_GENERATE;
  payload: {
    createdUserId: string;
    patientInfo: Pick<ScenarioDetail, "patientName" | "gender">;
    successCallback?: SuccessCallback;
    errorCallback?: ErrorCallback;
  };
}

export interface ScenarioDetailResponse {
  data: {
    detail: ScenarioDetail;
  };
}

export type ScenarioAction =
  | {
      type: "SCENARIO_GENERATE_SUCCESS";
      data: ScenarioDetail;
    }
  | {
      type: "SCENARIO_GENERATE";
    }
  | {
      type: "SCENARIO_RESET";
    };
