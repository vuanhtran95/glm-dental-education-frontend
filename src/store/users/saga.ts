import { put, takeLatest } from 'redux-saga/effects';
import { USER_AUTHENTICATE, USER_AUTHENTICATED } from './actionTypes';

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

function* authenticate() {
  yield delay(1000);
  yield console.log('Authenticating');
  const token = 'bsd8799889sdhvs9dv';
  yield put({ type: USER_AUTHENTICATED, token: token });
}

export default function* userSaga() {
  yield takeLatest(USER_AUTHENTICATE, authenticate);
}
