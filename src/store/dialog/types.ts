import { SuccessCallback, ErrorCallback } from '../../types';
import { ScenarioDetail } from '../scenario/types';
import {
  DIALOG_CREATE,
  DIALOG_LIST_FETCH,
  MESSAGE_CREATE,
} from './actionTypes';

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
  };
}

export interface DialogCreateAction {
  type: typeof DIALOG_CREATE;
  payload: {
    createdUserId: string;
    scenarioId: string;
    name: string;
    successCallback?: SuccessCallback;
    errorCallback?: ErrorCallback;
  };
}

export interface MessageCreateAction {
  type: typeof MESSAGE_CREATE;
  payload: {
    messages: MessagePayload;
    dialogId: string;
    successCallback?: SuccessCallback;
    errorCallback?: ErrorCallback;
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
    scenario: ScenarioDetail;
  };
}

export enum EMessageRole {
  SYSTEM = 'system',
  USER = 'user',
  ASSISTANT = 'assistant',
}

export interface MessageDetail {
  _id: string;
  role: EMessageRole;
  content: string;
  createdAt: Date;
  dialogId: string;
}

export type MessagePayload = Array<Pick<MessageDetail, 'content' | 'role'>>;

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
