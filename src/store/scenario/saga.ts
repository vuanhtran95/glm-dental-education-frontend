import { call, put, takeLatest } from 'redux-saga/effects';
import api from 'src/services/api';

import { ScenarioDetailGenerateAction, ScenarioDetailResponse } from './types';
import { SCENARIO_GENERATE, SCENARIO_GENERATE_SUCCESS } from './actionTypes';

function* generateScenario(action: ScenarioDetailGenerateAction) {
  const { patientInfo, successCallback, errorCallback } = action.payload;
  try {
    const response: ScenarioDetailResponse = yield call(() =>
      api.post(`api/scenarios/generate`, patientInfo, { timeout: 20000 })
    );
    yield put({
      type: SCENARIO_GENERATE_SUCCESS,
      data: response.data,
    });
    successCallback?.();
  } catch (err) {
    errorCallback?.();
  }
}

export default function* scenarioSaga() {
  yield takeLatest(SCENARIO_GENERATE, generateScenario);
}
