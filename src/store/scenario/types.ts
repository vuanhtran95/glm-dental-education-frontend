import { ErrorCallback, SuccessCallback } from '../../types';
import { SCENARIO_LIST_FETCH } from './actionTypes';

export interface ScenarioState {
  scenarios: ScenarioDetail[];
  loading: boolean;
  error: boolean;
  scenarioDetail: ScenarioDetail | null;
}

export interface SymptomDetail {
  name: string;
  description: string;
}

export interface ScenarioDetail {
  patientName: string;
  age: number;
  symptoms: SymptomDetail[];
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
    resolve: (data: any) => void;
    reject: () => void;
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
