import { action } from 'typesafe-actions';
import { USER_AUTHENTICATE, USER_SIGN_UP } from './actionTypes';
import { SuccessCallback } from '../../types';
import { LoginPayload } from '../../pages/authentication/login/types';
import { SignUpPayload } from '../../pages/authentication/signup/types';

export const authenticate = (
  value: LoginPayload,
  successCallback?: SuccessCallback,
  errorCallback?: ErrorCallback
) => action(USER_AUTHENTICATE, { value, successCallback, errorCallback });

export const signUp = (
  value: SignUpPayload,
  successCallback?: SuccessCallback,
  errorCallback?: ErrorCallback
) => action(USER_SIGN_UP, { value, successCallback, errorCallback });
