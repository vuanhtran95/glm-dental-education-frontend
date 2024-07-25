import { SCENARIO_GENERATE, SCENARIO_GENERATE_SUCCESS } from './actionTypes';
import { ScenarioAction, ScenarioState } from './types';

const initialState: ScenarioState = {
  scenarioDetail: null,
};

function scenarioReducer(
  state = initialState,
  action: ScenarioAction
): ScenarioState {
  switch (action.type) {
    case SCENARIO_GENERATE:
      return {
        ...state,
        scenarioDetail: null,
      };
    case SCENARIO_GENERATE_SUCCESS:
      return {
        ...state,
        scenarioDetail: action.data,
      };
    default:
      return state;
  }
}

export default scenarioReducer;
