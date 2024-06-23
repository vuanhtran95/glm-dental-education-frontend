import { action } from 'typesafe-actions';
import {
  SCENARIO_CREATE,
  SCENARIO_DETAIL_FETCH,
  SCENARIO_LIST_FETCH,
} from './actionTypes';
import { SuccessCallback } from '../../types';
import { ScenarioDetail } from './types';

export const fetchScenarioListAction = (
  successCallback?: SuccessCallback,
  errorCallback?: ErrorCallback
) =>
  action(SCENARIO_LIST_FETCH, {
    successCallback,
    errorCallback,
  });

export const fetchScenarioDetailAction = (
  scenarioId: string,
  successCallback?: SuccessCallback,
  errorCallback?: ErrorCallback
) =>
  action(SCENARIO_DETAIL_FETCH, { scenarioId, successCallback, errorCallback });

export const createScenarioAction = (
  scenarioDetail: Pick<
    ScenarioDetail,
    | 'name'
    | 'patientName'
    | 'age'
    | 'gender'
    | 'medicalHistory'
    | 'lifeStyle'
    | 'additionalInformation'
    | 'symptoms'
    | 'createdUserId'
    | 'communicationStyle'
  >,
  successCallback?: SuccessCallback,
  errorCallback?: ErrorCallback
) =>
  action(SCENARIO_CREATE, {
    scenarioDetail,
    successCallback,
    errorCallback,
  });
