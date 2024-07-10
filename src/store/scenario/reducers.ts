import {
  SCENARIO_DETAIL_FETCH,
  SCENARIO_DETAIL_FETCHED_FAILED,
  SCENARIO_DETAIL_FETCHED_SUCCESS,
  SCENARIO_GENERATE,
  SCENARIO_GENERATE_SUCCESS,
  SCENARIO_LIST_FETCH,
  SCENARIO_LIST_FETCHED_FAILED,
  SCENARIO_LIST_FETCHED_SUCCESS,
} from './actionTypes';
import { ScenarioAction, ScenarioState } from './types';

const initialState: ScenarioState = {
  loading: false,
  scenarios: [],
  error: false,
  scenarioDetail: null,
};

function scenarioReducer(
  state = initialState,
  action: ScenarioAction
): ScenarioState {
  switch (action.type) {
    case SCENARIO_LIST_FETCH:
      return {
        ...state,
        loading: true,
        scenarios: [],
      };
    case SCENARIO_LIST_FETCHED_SUCCESS:
      return {
        ...state,
        loading: false,
        scenarios: action.data,
      };
    case SCENARIO_LIST_FETCHED_FAILED:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case SCENARIO_DETAIL_FETCH:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case SCENARIO_DETAIL_FETCHED_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        scenarioDetail: action.data,
      };
    case SCENARIO_GENERATE:
      return {
        ...state,
        loading: true,
        error: false,
        scenarioDetail: null,
      };
    case SCENARIO_GENERATE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        scenarioDetail: action.data,
      };
    case SCENARIO_DETAIL_FETCHED_FAILED:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
}

export default scenarioReducer;
