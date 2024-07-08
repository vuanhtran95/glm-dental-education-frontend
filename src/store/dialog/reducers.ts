import {
  DIALOG_DETAIL_FETCH,
  DIALOG_DETAIL_FETCHED_FAILED,
  DIALOG_DETAIL_FETCHED_SUCCESS,
  DIALOG_DETAIL_FETCHED_SUCCESS_SENT_MESSAGE,
  DIALOG_LIST_FETCH,
  DIALOG_LIST_FETCHED_FAILED,
  DIALOG_LIST_FETCHED_SUCCESS,
} from './actionTypes';
import { DialogAction, DialogState } from './types';

const initialState: DialogState = {
  loading: false,
  dialogs: [],
  error: false,
  dialogDetail: null,
  isMessageSent: false,
};

function dialogReducer(
  state = initialState,
  action: DialogAction
): DialogState {
  switch (action.type) {
    case DIALOG_LIST_FETCH:
      return {
        ...state,
        loading: true,
        dialogs: [],
        isMessageSent: false,
      };
    case DIALOG_LIST_FETCHED_SUCCESS:
      return {
        ...state,
        loading: false,
        dialogs: action.data,
        isMessageSent: false,
      };
    case DIALOG_LIST_FETCHED_FAILED:
      return {
        ...state,
        loading: false,
        error: true,
        isMessageSent: false,
      };
    case DIALOG_DETAIL_FETCH:
      return {
        ...state,
        loading: true,
        error: false,
        isMessageSent: false,
      };
    case DIALOG_DETAIL_FETCHED_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        dialogDetail: action.data,
        isMessageSent: false,
      };
    case DIALOG_DETAIL_FETCHED_SUCCESS_SENT_MESSAGE:
      return {
        ...state,
        isMessageSent: true,
      };
    case DIALOG_DETAIL_FETCHED_FAILED:
      return {
        ...state,
        loading: false,
        error: true,
        dialogDetail: null,
        isMessageSent: false,
      };
    default:
      return state;
  }
}

export default dialogReducer;
