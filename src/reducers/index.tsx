import { combineReducers } from "redux";
import { REQUEST_FORECAST, SUCCESS_FORECAST, FAILED_FORECAST } from "../constant";
import {foreCastActionInterface} from "../types/forecast"
var foreCastReducer = (
  state = {
    fetching: false,
    fetched: false,
    error: false,
    foreCast: {forecastFiveDays:[],selectedDayForecast:{}},
  },
  action:foreCastActionInterface
) => {
  switch (action.type) {
    
    case REQUEST_FORECAST:
      return { ...state, fetching: true };
      break;
    case SUCCESS_FORECAST:
      return {
        ...state,
        error:false,
        fetching: false,
        fetched: true,
        foreCast: action.data,
      };
    case FAILED_FORECAST:
      return { ...state, fetching: false, fetched: false, error: action.error };
      break;
  }
  return state;
};

const allreducers = combineReducers({
  foreCast: foreCastReducer,
});

export default allreducers;
