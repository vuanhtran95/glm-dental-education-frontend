import { action } from 'typesafe-actions';
import { SCENARIO_GENERATE } from './actionTypes';
import { ScenarioDetail } from './types';
import { ErrorCallback, SuccessCallback } from 'src/types';

export const generateScenarioAction = (
  patientInfo: Pick<ScenarioDetail, 'patientName' | 'gender'>,
  successCallback?: SuccessCallback,
  errorCallback?: ErrorCallback
) =>
  action(SCENARIO_GENERATE, {
    patientInfo,
    successCallback,
    errorCallback,
  });
