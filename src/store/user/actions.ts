import { action } from 'typesafe-actions';
import { USER_AUTHENTICATE, USER_INFO_FETCH } from './actionTypes';
import { LoginInformation } from './types';
import { SuccessCallback } from '../../types';

export const authenticate = (
  value: LoginInformation,
  successCallback?: SuccessCallback,
  errorCallback?: ErrorCallback
) => action(USER_AUTHENTICATE, { value, successCallback, errorCallback });

export const getUserInfo = (
  successCallback: SuccessCallback,
  errorCallback: ErrorCallback
) => action(USER_INFO_FETCH, { successCallback, errorCallback });
