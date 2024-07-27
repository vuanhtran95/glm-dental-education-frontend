import { action } from 'typesafe-actions';
import {
  DIALOG_CREATE,
  DIALOG_DETAIL_FETCH,
  DIALOG_END,
  DIALOG_LIST_FETCH,
  DIALOG_SUBMIT,
  MESSAGE_CREATE,
  MESSAGE_FEEDBACK,
} from './actionTypes';
import { SuccessCallback, ErrorCallback } from '../../types';
import { MessagePayload } from './types';

export const fetchDialogListAction = (
  userId?: string,
  successCallback?: SuccessCallback,
  errorCallback?: ErrorCallback
) =>
  action(DIALOG_LIST_FETCH, {
    userId,
    successCallback,
    errorCallback,
  });

export const fetchDialogDetailAction = (
  dialogId: string,
  successCallback?: (text: string) => void,
  errorCallback?: ErrorCallback
) =>
  action(DIALOG_DETAIL_FETCH, {
    dialogId,
    successCallback,
    errorCallback,
  });

export const createDialogAction = (
  createdUserId: string,
  scenarioId: string,
  successCallback?: (id: string) => void,
  errorCallback?: ErrorCallback
) =>
  action(DIALOG_CREATE, {
    createdUserId,
    scenarioId,
    successCallback,
    errorCallback,
  });

export const createMessageAction = (
  message: MessagePayload,
  dialogId: string,
  successCallback?: SuccessCallback,
  errorCallback?: ErrorCallback
) =>
  action(MESSAGE_CREATE, {
    message,
    dialogId,
    successCallback,
    errorCallback,
  });

export const feedbackMessageAction = (
  feedback: string,
  messageId: string,
  successCallback?: SuccessCallback,
  errorCallback?: ErrorCallback
) =>
  action(MESSAGE_FEEDBACK, {
    feedback,
    messageId,
    successCallback,
    errorCallback,
  });

export const endDialogAction = (
  dialogId: string,
  successCallback?: SuccessCallback
) =>
  action(DIALOG_END, {
    dialogId,
    successCallback,
  });

export const submitDialogAction = (
  dialogId: string,
  successCallback?: SuccessCallback
) =>
  action(DIALOG_SUBMIT, {
    dialogId,
    successCallback,
  });
