import { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { ScenarioDetail } from '../store/scenario/types';
import { selectScenarioListState } from '../store/scenario/selectors';
import { fetchScenarioListAction } from '../store/scenario/actions';

const useScenarioList = () => {
  const dispatch = useDispatch();

  const scenarios: ScenarioDetail[] = useSelector(selectScenarioListState);

  const scenarioOptions = useMemo(() => {
    return scenarios.map(({ name, patientName, _id, symptoms }) => ({
      key: _id,
      label: `Scenario: ${name || 'No Name'} - Patient: ${
        patientName || ''
      } - Symptoms: ${symptoms.map((s) => s.name + '-')}`,
    }));
  }, [scenarios]);

  const fetchScenarioList = useCallback(() => {
    dispatch(fetchScenarioListAction());
  }, [dispatch]);

  return {
    scenarios,
    scenarioOptions,
    fetchScenarioList,
  };
};

export default useScenarioList;
