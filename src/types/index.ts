export type SuccessCallback = (id?: string) => void;
export type ErrorCallback = (error?: string) => void;

export interface DataPayload {
  successCallback: SuccessCallback;
  errorCallback: ErrorCallback;
}

export enum MicrophoneMode {
  IDLE = "idle",
  RECORDING = "recording",
  READY = "saving",
  SENDING = "sending",
}