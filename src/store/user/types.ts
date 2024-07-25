import { DataPayload } from '../../types';
import {
  USER_AUTHENTICATE,
  USER_INFO_FETCH,
  USER_SIGN_UP,
} from './actionTypes';

export interface AuthenticatePayload extends DataPayload {
  value: {
    username: string;
    password: string;
  };
}

export interface SignUpSagaPayload extends DataPayload {
  value: {
    username: string;
    password: string;
  };
}

export interface AuthenticateAction {
  type: typeof USER_AUTHENTICATE;
  payload: AuthenticatePayload;
}

export interface SignUpAction {
  type: typeof USER_SIGN_UP;
  payload: SignUpSagaPayload;
}

export interface GetUserInfoAction {
  type: typeof USER_INFO_FETCH;
}

export enum UserRole {
  STUDENT = 'student',
  SUPERVISOR = 'supervisor',
}
export interface UserInfo {
  _id: string;
  accountId: string;
  role: UserRole;
  fullName: string;
}

export interface AuthenticationResponse {
  data: {
    token: string;
  };
}

export interface UserResponse {
  data: {
    user: UserInfo;
  };
}
