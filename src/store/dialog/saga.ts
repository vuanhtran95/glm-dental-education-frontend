import { call, put, takeLatest } from 'redux-saga/effects';
import api from '../../services/api';
import {
  DIALOG_DETAIL_FETCH,
  DIALOG_DETAIL_FETCHED_FAILED,
  DIALOG_DETAIL_FETCHED_SUCCESS,
  DIALOG_LIST_FETCH,
  DIALOG_LIST_FETCHED_FAILED,
  DIALOG_LIST_FETCHED_SUCCESS,
} from './actionTypes';
import {
  DialogDetailFetchAction,
  DialogDetailResponse,
  DialogListFetchAction,
  DialogListResponse,
} from './types';

function* getDialogList(action: DialogListFetchAction) {
  const { userId } = action.payload;
  try {
    const response: DialogListResponse = yield call(() =>
      api.get(`api/dialogs/?user_id=${userId}`)
    );
    yield put({
      type: DIALOG_LIST_FETCHED_SUCCESS,
      data: response.data.dialogs,
    });
  } catch (err) {
    yield put({ type: DIALOG_LIST_FETCHED_FAILED });
  }
}

function* getDialogDetail(action: DialogDetailFetchAction) {
  const { dialogId, successCallback, errorCallback } = action.payload;
  try {
    const response: DialogDetailResponse = yield call(() =>
      api.get(`api/dialogs/${dialogId}`)
    );
    yield put({
      type: DIALOG_DETAIL_FETCHED_SUCCESS,
      data: response.data,
    });
    successCallback?.();
  } catch (err) {
    yield put({ type: DIALOG_DETAIL_FETCHED_FAILED });
    errorCallback?.();
  }
}

export default function* dialogSaga() {
  yield takeLatest(DIALOG_LIST_FETCH, getDialogList);
  yield takeLatest(DIALOG_DETAIL_FETCH, getDialogDetail);
}
