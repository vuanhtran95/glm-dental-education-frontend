import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { ScenarioDetail } from '../store/scenario/types';
import { selectScenarioListState } from '../store/scenario/selectors';
import { fetchScenarioListAction } from '../store/scenario/actions';

const useScenarioList = () => {
  const dispatch = useDispatch();

  const scenarios: ScenarioDetail[] = useSelector(selectScenarioListState);

  const fetchScenarioList = useCallback(() => {
    dispatch(fetchScenarioListAction());
  }, [dispatch]);

  return {
    scenarios,
    fetchScenarioList,
  };
};

export default useScenarioList;
