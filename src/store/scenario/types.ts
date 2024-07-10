import { ErrorCallback, SuccessCallback } from '../../types';
import {
  SCENARIO_CREATE,
  SCENARIO_GENERATE,
  SCENARIO_LIST_FETCH,
} from './actionTypes';

export interface ScenarioState {
  scenarios: ScenarioDetail[];
  loading: boolean;
  error: boolean;
  scenarioDetail: ScenarioDetail | null;
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

export interface ScenarioDetail {
  _id: string;
  name: string;
  patientName: string;
  age: number;
  gender: Gender;
  symptoms: string;
  medicalHistory: string;
  communicationStyle: string;
  lifeStyle?: string;
  additionalInformation?: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  createdUserId: string;
}

export interface ScenarioListFetchAction {
  type: typeof SCENARIO_LIST_FETCH;
  payload: {
    userId: string;
  };
}

export interface ScenarioDetailFetchAction {
  type: typeof SCENARIO_LIST_FETCH;
  payload: {
    scenarioId: string;
    successCallback?: SuccessCallback;
    errorCallback?: ErrorCallback;
  };
}

export interface ScenarioDetailCreateAction {
  type: typeof SCENARIO_CREATE;
  payload: {
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
    >;
    successCallback?: SuccessCallback;
    errorCallback?: ErrorCallback;
  };
}

export interface ScenarioDetailGenerateAction {
  type: typeof SCENARIO_GENERATE;
  payload: {
    createdUserId: string;
    successCallback?: SuccessCallback;
    errorCallback?: ErrorCallback;
  };
}

export interface ScenarioListResponse {
  data: {
    scenarios: ScenarioDetail[];
  };
}

export interface ScenarioDetailResponse {
  data: {
    detail: ScenarioDetail;
  };
}

export type ScenarioAction =
  | {
      type: 'SCENARIO_LIST_FETCHED_SUCCESS';
      data: ScenarioDetail[];
    }
  | {
      type: 'SCENARIO_DETAIL_FETCHED_SUCCESS';
      data: ScenarioDetail;
    }
  | {
      type: 'SCENARIO_LIST_FETCHED_FAILED';
    }
  | {
      type: 'SCENARIO_DETAIL_FETCHED_FAILED';
    }
  | {
      type: 'SCENARIO_LIST_FETCH';
    }
  | {
      type: 'SCENARIO_DETAIL_FETCH';
    };
