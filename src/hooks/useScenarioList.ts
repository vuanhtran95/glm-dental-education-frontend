import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { fetchDialogListAction } from '../store/dialog/actions';
import { ScenarioDetail } from '../store/scenario/types';
import { selectScenarioListState } from '../store/scenario/selectors';

interface Props {
  userId: string;
}

// eslint-disable-next-line no-empty-pattern
const useScenarioList = ({}: Props) => {
  const dispatch = useDispatch();

  const scenarios: ScenarioDetail[] = useSelector(selectScenarioListState);

  const fetchScenarioList = useCallback(() => {
    dispatch(fetchDialogListAction());
  }, [dispatch]);

  return {
    scenarios,
    fetchScenarioList,
  };
};

export default useScenarioList;
