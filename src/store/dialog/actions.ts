import { action } from 'typesafe-actions';
import {
  DIALOG_CREATE,
  DIALOG_DETAIL_FETCH,
  DIALOG_LIST_FETCH,
  MESSAGE_CREATE,
} from './actionTypes';
import { SuccessCallback, ErrorCallback } from '../../types';
import { MessagePayload } from './types';

export const fetchDialogListAction = (
  userId: string,
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
  isMessageSent?: boolean,
  successCallback?: (text: string) => void,
  errorCallback?: ErrorCallback
) =>
  action(DIALOG_DETAIL_FETCH, {
    dialogId,
    isMessageSent,
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
