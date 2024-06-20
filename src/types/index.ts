import { UserState } from '../store/user/types';

export interface RootState {
  user: UserState;
}

export type SuccessCallback = () => void;
export type ErrorCallback = (error?: string) => void;

export interface DataPayload {
  successCallback: SuccessCallback;
  errorCallback: ErrorCallback;
}

export interface Credentials {
  [username: string]: string;
}

export interface AuthenticatedUserInfo {
  id: string;
  username: string;
}
