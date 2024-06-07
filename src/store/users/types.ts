export interface LoginInformation {
  username: string;
  password: string;
  remember: boolean;
}

export interface UserState {
  data: null | unknown;
  loading: boolean;
  error: null | boolean;
  token: string | null;
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
