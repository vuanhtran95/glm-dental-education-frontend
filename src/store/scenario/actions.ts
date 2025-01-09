import { action } from "typesafe-actions";
import { SCENARIO_GENERATE, SCENARIO_RESET } from "./actionTypes";
import { ScenarioDetail } from "./types";
import { ErrorCallback, SuccessCallback } from "src/types";

export const generateScenarioAction = (
  patientInfo: Pick<
    ScenarioDetail,
    "patientName" | "gender" | "clinicalContext" | "medicalHistory"
  >,
  successCallback?: SuccessCallback,
  errorCallback?: ErrorCallback,
) =>
  action(SCENARIO_GENERATE, {
    patientInfo,
    successCallback,
    errorCallback,
  });

export const resetScenarioAction = () => action(SCENARIO_RESET);
