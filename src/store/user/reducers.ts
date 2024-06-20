import { USER_AUTHENTICATE, USER_AUTHENTICATED } from './actionTypes';
import { UserAction, UserState } from './types';

const initialState: UserState = {
  loading: false,
};

function userReducer(state = initialState, action: UserAction): UserState {
  switch (action.type) {
    case USER_AUTHENTICATE:
      return {
        ...state,
        loading: true,
      };
    case USER_AUTHENTICATED:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
}

export default userReducer;
