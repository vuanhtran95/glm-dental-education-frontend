import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { fetchDialogDetailAction } from '../store/dialog/actions';
import { useSelector } from 'react-redux';
import { ScenarioDetail } from '../store/scenario/types';
import { selectScenarioDetailState } from '../store/scenario/selectors';

interface Props {
  scenarioId?: string;
}

const useScenarioDetail = ({ scenarioId }: Props) => {
  const dispatch = useDispatch();

  const scenarioDetail: ScenarioDetail | null = useSelector(
    selectScenarioDetailState
  );

  const fetchScenarioDetail = useCallback(() => {
    if (!scenarioId) return;
    dispatch(fetchDialogDetailAction(scenarioId));
  }, [dispatch, scenarioId]);

  return {
    scenarioDetail,
    fetchScenarioDetail,
  };
};

export default useScenarioDetail;
