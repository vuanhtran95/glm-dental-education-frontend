import {
  DIALOG_DETAIL_FETCH,
  DIALOG_DETAIL_FETCHED_FAILED,
  DIALOG_DETAIL_FETCHED_SUCCESS,
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
      };
    case DIALOG_LIST_FETCHED_SUCCESS:
      return {
        ...state,
        loading: false,
        dialogs: action.data,
      };
    case DIALOG_LIST_FETCHED_FAILED:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case DIALOG_DETAIL_FETCH:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case DIALOG_DETAIL_FETCHED_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        dialogDetail: action.data,
      };
    case DIALOG_DETAIL_FETCHED_FAILED:
      return {
        ...state,
        loading: false,
        error: true,
        dialogDetail: null,
      };
    default:
      return state;
  }
}

export default dialogReducer;
