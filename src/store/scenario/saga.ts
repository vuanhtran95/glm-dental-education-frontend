import { call, put, takeLatest } from 'redux-saga/effects';
import api from '../../services/api';
import {
  ScenarioDetailCreateAction,
  ScenarioDetailFetchAction,
  ScenarioDetailGenerateAction,
  ScenarioDetailResponse,
  ScenarioListFetchAction,
  ScenarioListResponse,
} from './types';
import {
  SCENARIO_CREATE,
  SCENARIO_DETAIL_FETCH,
  SCENARIO_DETAIL_FETCHED_FAILED,
  SCENARIO_DETAIL_FETCHED_SUCCESS,
  SCENARIO_GENERATE,
  SCENARIO_GENERATE_ERROR,
  SCENARIO_GENERATE_SUCCESS,
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

function* createScenario(action: ScenarioDetailCreateAction) {
  const { scenarioDetail, successCallback, errorCallback } = action.payload;
  try {
    const response: ScenarioDetailResponse = yield call(() =>
      api.post(`api/scenarios/`, { ...scenarioDetail })
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

function* generateScenario(action: ScenarioDetailGenerateAction) {
  const { createdUserId, successCallback, errorCallback } = action.payload;
  try {
    const response: ScenarioDetailResponse = yield call(() =>
      api.post(`api/scenarios/generate`, { createdUserId }, { timeout: 15000 })
    );
    yield put({
      type: SCENARIO_GENERATE_SUCCESS,
      data: response.data,
    });
    successCallback?.();
  } catch (err) {
    console.log(err, 'err');

    yield put({ type: SCENARIO_GENERATE_ERROR });
    errorCallback?.();
  }
}

export default function* scenarioSaga() {
  yield takeLatest(SCENARIO_LIST_FETCH, getScenarioList);
  yield takeLatest(SCENARIO_DETAIL_FETCH, getScenarioDetail);
  yield takeLatest(SCENARIO_CREATE, createScenario);
  yield takeLatest(SCENARIO_GENERATE, generateScenario);
}
