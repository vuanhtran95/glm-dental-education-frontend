import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectDialogListState } from '../store/dialog/selectors';
import { fetchDialogListAction } from '../store/dialog/actions';
import { DialogDetail } from '../store/dialog/types';

interface Props {
  userId: string;
}

const useDialogList = ({ userId }: Props) => {
  const dispatch = useDispatch();

  const dialogs: DialogDetail[] = useSelector(selectDialogListState);

  const fetchDialogList = useCallback(() => {
    if (!userId) return;
    dispatch(fetchDialogListAction(userId));
  }, [dispatch, userId]);

  return {
    dialogs,
    fetchDialogList,
  };
};

export default useDialogList;
