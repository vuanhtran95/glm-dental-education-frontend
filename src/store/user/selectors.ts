import { RootState } from '../store';

export const selectUserLoadingState = (state: RootState) => {
  return state.user.loading;
};
