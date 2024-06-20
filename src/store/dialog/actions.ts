import { action } from 'typesafe-actions';
import { DIALOG_DETAIL_FETCH, DIALOG_LIST_FETCH } from './actionTypes';
import { SuccessCallback } from '../../types';

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
  successCallback?: SuccessCallback,
  errorCallback?: ErrorCallback
) => action(DIALOG_DETAIL_FETCH, { dialogId, successCallback, errorCallback });
