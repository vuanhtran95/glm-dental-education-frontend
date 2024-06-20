import { SuccessCallback, ErrorCallback } from '../../types';
import { DIALOG_LIST_FETCH } from './actionTypes';

export interface DialogListFetchAction {
  type: typeof DIALOG_LIST_FETCH;
  payload: {
    userId: string;
  };
}

export interface DialogDetailFetchAction {
  type: typeof DIALOG_LIST_FETCH;
  payload: {
    dialogId: string;
    successCallback?: SuccessCallback;
    errorCallback?: ErrorCallback;
    resolve: (data: any) => void;
    reject: () => void;
  };
}

export interface DialogDetail {
  _id: string;
  name: string;
  createdUserId: string;
  scenarioId: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface DialogDetailWithMessage {
  detail: {
    dialog: DialogDetail;
    messages: MessageDetail[];
  };
}

export enum EMessageRole {
  SYSTEM = 'system',
  USER = 'user',
}

export interface MessageDetail {
  _id: string;
  role: EMessageRole;
  content: string;
  createdAt: Date;
  dialogId: string;
}

export interface DialogState {
  dialogs: DialogDetail[];
  loading: boolean;
  error: boolean;
  dialogDetail: DialogDetailWithMessage | null;
}

export type DialogAction =
  | {
      type: 'DIALOG_LIST_FETCHED_SUCCESS';
      data: DialogDetail[];
    }
  | {
      type: 'DIALOG_DETAIL_FETCHED_SUCCESS';
      data: DialogDetailWithMessage;
    }
  | {
      type: 'DIALOG_LIST_FETCHED_FAILED';
    }
  | {
      type: 'DIALOG_DETAIL_FETCHED_FAILED';
    }
  | {
      type: 'DIALOG_LIST_FETCH';
    }
  | {
      type: 'DIALOG_DETAIL_FETCH';
    };

export interface DialogListResponse {
  data: {
    dialogs: DialogDetail[];
  };
}

export interface DialogDetailResponse {
  data: {
    detail: {
      dialog: DialogDetail;
      messages: MessageDetail[];
    };
  };
}
