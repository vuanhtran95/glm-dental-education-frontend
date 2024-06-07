import {
  USER_AUTHENTICATE,
  USER_AUTHENTICATED,
  USER_UNAUTHORIZED,
} from './actionTypes';
import { UserAction, UserState } from './types';

const initialState: UserState = {
  data: null,
  loading: false,
  error: null,
  token: null,
};

function userReducer(state = initialState, action: UserAction): UserState {
  switch (action.type) {
    case USER_AUTHENTICATE:
      return {
        ...state,
        loading: true,
        error: null,
        data: null,
      };
    case USER_AUTHENTICATED:
      return {
        ...state,
        token: action.token,
        error: false,
        loading: false,
      };
    case USER_UNAUTHORIZED:
      return {
        ...state,
        data: null,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
}

export default userReducer;
