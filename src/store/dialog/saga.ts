import { call, put, takeLatest } from 'redux-saga/effects';
import api from '../../services/api';
import {
  DIALOG_CREATE,
  DIALOG_CREATE_FAILED,
  DIALOG_DETAIL_FETCH,
  DIALOG_DETAIL_FETCHED_FAILED,
  DIALOG_DETAIL_FETCHED_SUCCESS,
  DIALOG_END,
  DIALOG_LIST_FETCH,
  DIALOG_LIST_FETCHED_FAILED,
  DIALOG_LIST_FETCHED_SUCCESS,
  DIALOG_SUBMIT,
  MESSAGE_CREATE,
  MESSAGE_CREATE_FAILED,
  MESSAGE_CREATE_SUCCESS,
  MESSAGE_FEEDBACK,
} from './actionTypes';
import {
  DialogCreateAction,
  DialogDetailFetchAction,
  DialogDetailResponse,
  DialogEndAction,
  DialogListFetchAction,
  DialogListResponse,
  MessageCreateAction,
  MessageFeedbackAction,
} from './types';

function* getDialogList(action: DialogListFetchAction) {
  const { userId } = action.payload;
  try {
    const response: DialogListResponse = yield call(() =>
      api.get(`api/dialogs/${userId ? `?userId=${userId}` : ''}`)
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

    const data = response.data;

    yield put({
      type: DIALOG_DETAIL_FETCHED_SUCCESS,
      data: data,
    });

    successCallback?.(
      data.detail.messages[data.detail.messages.length - 1].content
    );
  } catch (err) {
    yield put({ type: DIALOG_DETAIL_FETCHED_FAILED });
    errorCallback?.();
  }
}

function* createDialog(action: DialogCreateAction) {
  const { createdUserId, scenarioId, successCallback, errorCallback } =
    action.payload;
  try {
    const response: DialogDetailResponse = yield call(() =>
      api.post(`api/dialogs`, {
        createdUserId,
        scenarioId,
      })
    );
    successCallback?.(response.data._id);
  } catch (err) {
    errorCallback?.();
  }
}

function* endDialog(action: DialogEndAction) {
  const { dialogId, successCallback } = action.payload;
  try {
    yield call(() => api.post(`api/dialogs/${dialogId}/end`));
    successCallback?.();
  } catch (err) {
    console.error(err);
  }
}

function* submitDialog(action: DialogEndAction) {
  const { dialogId, successCallback } = action.payload;
  try {
    yield call(() => api.post(`api/dialogs/${dialogId}/submit`));
    successCallback?.();
  } catch (err) {
    console.error(err);
  }
}

function* createMessage(action: MessageCreateAction) {
  const { message, dialogId, successCallback, errorCallback } = action.payload;

  try {
    const response: DialogDetailResponse = yield call(() =>
      api.post(
        `api/messages`,
        {
          message,
          dialogId,
        },
        { timeout: 15000 }
      )
    );
    yield put({
      type: MESSAGE_CREATE_SUCCESS,
      data: response.data,
    });

    successCallback?.();
  } catch (err) {
    yield put({ type: MESSAGE_CREATE_FAILED });
    errorCallback?.();
  }
}

function* feedbackMessage(action: MessageFeedbackAction) {
  const { messageId, feedback, successCallback, errorCallback } =
    action.payload;

  try {
    yield call(() =>
      api.post(
        `api/messages/${messageId}/feedback`,
        {
          feedback,
        },
        { timeout: 15000 }
      )
    );

    successCallback?.();
  } catch (err) {
    yield put({ type: MESSAGE_CREATE_FAILED });
    errorCallback?.();
  }
}

export default function* dialogSaga() {
  yield takeLatest(DIALOG_LIST_FETCH, getDialogList);
  yield takeLatest(DIALOG_DETAIL_FETCH, getDialogDetail);
  yield takeLatest(DIALOG_CREATE, createDialog);
  yield takeLatest(MESSAGE_CREATE, createMessage);

  yield takeLatest(DIALOG_END, endDialog);
  yield takeLatest(DIALOG_SUBMIT, submitDialog);

  yield takeLatest(MESSAGE_FEEDBACK, feedbackMessage);
}
