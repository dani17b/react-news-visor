import * as types from '../../../constants/ActionTypes';

const initialState = {
  mode : "calibration",
  debugActive : true,
  showMonitor : true,
  loading : false,
  news : [],
};

export default function home(state = initialState, action) {
  switch (action.type) {
    case types.GET_NEWS_REQUEST:
      return {
        ...state,
        loading : true,
      }
    case types.GET_NEWS_RESPONSE:
      return {
        ...state,
        loading : false,
        news : action.news
      }
    case types.END_CALIBRATION:
      return {
        ...state,
        mode : "detection"
      }
    case types.INIT_CALIBRATION:
      return {
        ...state,
        mode : "calibration"
      }
    default:
      return state;
  }
}
