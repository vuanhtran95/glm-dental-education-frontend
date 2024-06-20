import { useEffect } from 'react';
import useScenarioList from '../../hooks/useScenarioList';
import DataTable from './components/data-table';

interface Props {}

// eslint-disable-next-line no-empty-pattern
const Scenario = ({}: Props) => {
  const { scenarios, fetchScenarioList } = useScenarioList();

  useEffect(() => {
    fetchScenarioList();
  }, [fetchScenarioList]);

  return <DataTable data={scenarios} />;
};

export default Scenario;
