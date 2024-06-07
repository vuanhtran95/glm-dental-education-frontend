import { UserState } from '../store/users/types';

export interface RootState {
  user: UserState;
}

export interface Credentials {
  [username: string]: string;
}

export interface AuthenticatedUserInfo {
  id: string;
  username: string;
}
