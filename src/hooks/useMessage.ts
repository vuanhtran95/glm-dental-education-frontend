import { useCallback } from 'react';
import { MessagePayload } from '../store/dialog/types';
import { useDispatch } from 'react-redux';
import { createMessageAction } from '../store/dialog/actions';
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

  return { createMessage };
};

export default useMessage;
