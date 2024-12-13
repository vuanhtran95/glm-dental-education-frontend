import { SuccessCallback, ErrorCallback } from "../../types";
import { ScenarioDetail } from "../scenario/types";
import { UserInfo } from "../user/types";
import {
  DIALOG_CREATE,
  DIALOG_END,
  DIALOG_LIST_FETCH,
  DIALOG_SUBMIT,
  MESSAGE_CREATE,
  MESSAGE_FEEDBACK,
} from "./actionTypes";

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

export interface DialogEndAction {
  type: typeof DIALOG_END;
  payload: {
    dialogId: string;
    successCallback?: SuccessCallback;
    errorCallback?: ErrorCallback;
  };
}

export interface DialogSubmitAction {
  type: typeof DIALOG_SUBMIT;
  payload: {
    dialogId: string;
    successCallback?: SuccessCallback;
    errorCallback?: ErrorCallback;
  };
}

export interface MessageCreateAction {
  type: typeof MESSAGE_CREATE;
  payload: {
    message: MessagePayload;
    dialogId: string;
    successCallback?: SuccessCallback;
    errorCallback?: ErrorCallback;
  };
}

export interface MessageFeedbackAction {
  type: typeof MESSAGE_FEEDBACK;
  payload: {
    messageId: string;
    feedback: string;
    successCallback?: SuccessCallback;
    errorCallback?: ErrorCallback;
  };
}

export interface AudioMessageCreateAction {
  type: typeof MESSAGE_CREATE;
  payload: {
    s3Id: string;
    dialogId: string;
    successCallback?: SuccessCallback;
    errorCallback?: ErrorCallback;
  };
}

export interface DialogDetail {
  _id: string;
  createdUserId: string;
  scenarioId: string;
  isEnded: boolean;
  isSubmitted: boolean;
  createdAt: Date;
  updatedAt: Date;
  scenario: ScenarioDetail;
  user: UserInfo;
}

export interface DialogDetailWithMessage {
  detail: {
    dialog: DialogDetail;
    messages: MessageDetail[];
    scenario: ScenarioDetail;
    user: UserInfo;
  };
}

export enum EMessageRole {
  SYSTEM = "system",
  USER = "user",
  ASSISTANT = "assistant",
}

export interface MessageDetail {
  _id: string;
  role: EMessageRole;
  content: string;
  createdAt: Date;
  dialogId: string;
  uri?: string;
  feedback?: string;
}

export type MessagePayload = Pick<MessageDetail, "content" | "uri">;

export interface DialogState {
  dialogs: DialogDetail[];
  loading: boolean;
  error: boolean;
  dialogDetail: DialogDetailWithMessage | null;
}

export type DialogAction =
  | {
      type: "DIALOG_LIST_FETCHED_SUCCESS";
      data: DialogDetail[];
    }
  | {
      type: "DIALOG_DETAIL_FETCHED_SUCCESS";
      data: DialogDetailWithMessage;
    }
  | {
      type: "DIALOG_LIST_FETCHED_FAILED";
    }
  | {
      type: "DIALOG_DETAIL_FETCHED_FAILED";
    }
  | {
      type: "DIALOG_LIST_FETCH";
    }
  | {
      type: "DIALOG_DETAIL_FETCH";
    }
  | {
      type: "DIALOG_DETAIL_FETCHED_SUCCESS_SENT_MESSAGE";
    };

export interface DialogListResponse {
  data: {
    dialogs: DialogDetail[];
  };
}

export interface DialogDetailResponse {
  data: DialogDetail;
}

export interface DialogDetailWithMessageResponse {
  data: DialogDetailWithMessage;
}
