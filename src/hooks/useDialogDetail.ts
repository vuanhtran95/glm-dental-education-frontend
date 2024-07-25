import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { fetchDialogDetailAction } from '../store/dialog/actions';
import { DialogDetailWithMessage } from '../store/dialog/types';
import { useSelector } from 'react-redux';
import { selectDialogDetailState } from '../store/dialog/selectors';

interface Props {
  dialogId?: string;
}

const useDialogDetail = ({ dialogId }: Props) => {
  const dispatch = useDispatch();

  const dialogDetail: DialogDetailWithMessage | null = useSelector(
    selectDialogDetailState
  );

  const fetchDialogDetail = useCallback(
    (isMessageSent: boolean, successCallback?: (value: string) => void) => {
      if (!dialogId) return;
      dispatch(
        fetchDialogDetailAction(dialogId, isMessageSent, successCallback)
      );
    },
    [dispatch, dialogId]
  );

  return {
    dialogDetail: dialogDetail?.detail.dialog,
    messages: dialogDetail?.detail.messages,
    scenario: dialogDetail?.detail.scenario,
    fetchDialogDetail,
  };
};

export default useDialogDetail;
