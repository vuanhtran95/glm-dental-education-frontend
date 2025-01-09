import {
  SCENARIO_GENERATE,
  SCENARIO_GENERATE_SUCCESS,
  SCENARIO_RESET,
} from "./actionTypes";
import { ScenarioAction, ScenarioState } from "./types";

const initialState: ScenarioState = {
  scenarioDetail: null,
};

function scenarioReducer(
  state = initialState,
  action: ScenarioAction,
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
    case SCENARIO_RESET:
      return {
        ...state,
        scenarioDetail: null,
      };
    default:
      return state;
  }
}

export default scenarioReducer;
