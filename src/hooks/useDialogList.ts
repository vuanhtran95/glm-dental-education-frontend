import { useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectDialogListState } from "../store/dialog/selectors";
import { fetchDialogListAction } from "../store/dialog/actions";
import { DialogDetail } from "../store/dialog/types";

interface Props {
  userId?: string;
}

const useDialogList = ({ userId }: Props) => {
  const dispatch = useDispatch();

  const dialogs: DialogDetail[] = useSelector(selectDialogListState);

  const dialogData = useMemo(() => {
    return dialogs.map((dialog: DialogDetail) => ({
      patientName: dialog.scenario.patientName,
      studentId: dialog.createdUserId,
      id: dialog._id,
      isSubmitted: dialog.isSubmitted,
    }));
  }, [dialogs]);

  const fetchDialogList = useCallback(() => {
    dispatch(fetchDialogListAction(userId));
  }, [dispatch, userId]);

  return {
    dialogData,
    fetchDialogList,
  };
};

export default useDialogList;
