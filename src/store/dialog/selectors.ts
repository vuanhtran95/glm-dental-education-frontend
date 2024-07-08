import { RootState } from '../store';

export const selectDialogLoadingState = (state: RootState) => {
  return state.dialog.loading;
};

export const selectDialogListState = (state: RootState) => {
  return state.dialog.dialogs;
};

export const selectDialogDetailState = (state: RootState) => {
  return state.dialog.dialogDetail;
};

export const selectIsSentMessage = (state: RootState) => {
  return state.dialog.isMessageSent;
};
