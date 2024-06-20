import { DataPayload } from '../../types';
import { USER_AUTHENTICATE, USER_INFO_FETCH } from './actionTypes';

export interface AuthenticatePayload extends DataPayload {
  value: {
    username: string;
    password: string;
  };
}

export interface AuthenticateAction {
  type: typeof USER_AUTHENTICATE;
  payload: AuthenticatePayload;
}

export interface GetUserInfoPayload extends DataPayload {}

export interface GetUserInfoAction {
  type: typeof USER_INFO_FETCH;
  payload: AuthenticatePayload;
}

export enum UserRole {
  SYSTEM = 'system',
  USER = 'user',
}
export interface UserInfo {
  _id: string;
  accountId: string;
  role: UserRole;
  fullName: string;
}

export interface UserState {
  loading: boolean;
}

export interface UserData {}

export type UserAction =
  | {
      type: 'USER_AUTHENTICATE';
    }
  | {
      type: 'USER_AUTHENTICATED';
      token: string;
    }
  | {
      type: 'USER_UNAUTHORIZED';
    };

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
