import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  endDialogAction,
  fetchDialogDetailAction,
  submitDialogAction,
} from '../store/dialog/actions';
import { DialogDetailWithMessage } from '../store/dialog/types';
import { useSelector } from 'react-redux';
import { selectDialogDetailState } from '../store/dialog/selectors';
import { SuccessCallback } from 'src/types';

interface Props {
  dialogId?: string;
}

const useDialogDetail = ({ dialogId }: Props) => {
  const dispatch = useDispatch();

  const dialogDetail: DialogDetailWithMessage | null = useSelector(
    selectDialogDetailState
  );

  const fetchDialogDetail = useCallback(
    (successCallback?: (value: string) => void) => {
      if (!dialogId) return;
      dispatch(fetchDialogDetailAction(dialogId, successCallback));
    },
    [dispatch, dialogId]
  );

  const endDialog = useCallback(
    (successCallback?: SuccessCallback) => {
      if (!dialogId) return;
      dispatch(endDialogAction(dialogId, successCallback));
    },
    [dialogId, dispatch]
  );

  const submitDialog = useCallback(
    (successCallback?: SuccessCallback) => {
      if (!dialogId) return;
      dispatch(submitDialogAction(dialogId, successCallback));
    },
    [dialogId, dispatch]
  );

  return {
    dialogDetail: dialogDetail?.detail.dialog,
    messages: dialogDetail?.detail.messages,
    scenario: dialogDetail?.detail.scenario,
    fetchDialogDetail,
    endDialog,
    submitDialog,
  };
};

export default useDialogDetail;
