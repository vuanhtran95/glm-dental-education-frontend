import { useEffect } from 'react';
import useScenarioList from '../../hooks/useScenarioList';
import DataTable from './components/data-table';

const Scenario = () => {
  const { scenarios, fetchScenarioList } = useScenarioList();

  useEffect(() => {
    fetchScenarioList();
  }, [fetchScenarioList]);

  return <DataTable data={scenarios} />;
};

export default Scenario;
