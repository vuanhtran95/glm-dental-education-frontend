import { RootState } from '../store';

export const selectScenarioLoadingState = (state: RootState) => {
  return state.scenario.loading;
};

export const selectScenarioListState = (state: RootState) => {
  return state.scenario.scenarios;
};

export const selectScenarioDetailState = (state: RootState) => {
  return state.scenario.scenarioDetail;
};
