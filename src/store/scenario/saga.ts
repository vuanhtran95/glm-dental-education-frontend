import { call, put, takeLatest } from 'redux-saga/effects';
import api from '../../services/api';
import {
  ScenarioDetailFetchAction,
  ScenarioDetailResponse,
  ScenarioListFetchAction,
  ScenarioListResponse,
} from './types';
import {
  SCENARIO_DETAIL_FETCH,
  SCENARIO_DETAIL_FETCHED_FAILED,
  SCENARIO_DETAIL_FETCHED_SUCCESS,
  SCENARIO_LIST_FETCH,
  SCENARIO_LIST_FETCHED_FAILED,
  SCENARIO_LIST_FETCHED_SUCCESS,
} from './actionTypes';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function* getScenarioList(_action: ScenarioListFetchAction) {
  try {
    const response: ScenarioListResponse = yield call(() =>
      api.get(`api/scenarios`)
    );
    yield put({
      type: SCENARIO_LIST_FETCHED_SUCCESS,
      data: response.data.scenarios,
    });
  } catch (err) {
    yield put({ type: SCENARIO_LIST_FETCHED_FAILED });
  }
}

function* getScenarioDetail(action: ScenarioDetailFetchAction) {
  const { scenarioId, successCallback, errorCallback } = action.payload;
  try {
    const response: ScenarioDetailResponse = yield call(() =>
      api.get(`api/scenarios/${scenarioId}`)
    );
    yield put({
      type: SCENARIO_DETAIL_FETCHED_SUCCESS,
      data: response.data,
    });
    successCallback?.();
  } catch (err) {
    yield put({ type: SCENARIO_DETAIL_FETCHED_FAILED });
    errorCallback?.();
  }
}

export default function* dialogSaga() {
  yield takeLatest(SCENARIO_LIST_FETCH, getScenarioList);
  yield takeLatest(SCENARIO_DETAIL_FETCH, getScenarioDetail);
}
