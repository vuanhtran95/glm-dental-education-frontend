import { RootState } from "../store";

export const selectScenarioDetailState = (state: RootState) => {
  return state.scenario.scenarioDetail;
};
