import { useCallback } from 'react';
import { MessagePayload } from '../store/dialog/types';
import { useDispatch } from 'react-redux';
import {
  createMessageAction,
  feedbackMessageAction,
} from '../store/dialog/actions';
import { SuccessCallback, ErrorCallback } from '../types';

interface Props {
  dialogId?: string;
}

const useMessage = ({ dialogId }: Props) => {
  const dispatch = useDispatch();

  const createMessage = useCallback(
    (
      message: MessagePayload,
      successCallback?: SuccessCallback,
      errorCallback?: ErrorCallback
    ) => {
      if (dialogId)
        dispatch(
          createMessageAction(message, dialogId, successCallback, errorCallback)
        );
    },
    [dialogId, dispatch]
  );

  const feedbackMessage = useCallback(
    (
      messageId: string,
      feedback: string,
      successCallback?: SuccessCallback,
      errorCallback?: ErrorCallback
    ) => {
      dispatch(
        feedbackMessageAction(
          feedback,
          messageId,
          successCallback,
          errorCallback
        )
      );
    },
    [dispatch]
  );

  return { createMessage, feedbackMessage };
};

export default useMessage;
