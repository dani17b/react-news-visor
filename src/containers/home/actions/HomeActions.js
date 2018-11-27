import * as types from '../../../constants/ActionTypes';
import Config from '../../../config/Config';
import "isomorphic-fetch";

export function initCalibration() {
    return {
        type : types.INIT_CALIBRATION
    }
}

export function endCalibration() {
    return {
        type : types.END_CALIBRATION
    }
}

export function getNews() {
    return dispatch => {
        dispatch(getNewsRequest());
  
        fetch(Config.apiUrl + "news", {
            method: 'GET',
            headers: {
              'Accept': 'application/json'
            }})
            .then(response => response.json())
            .then(json => dispatch(getNewsResponse(json)));
    }
  }
  
function getNewsRequest() {
    return {
        type : types.GET_NEWS_REQUEST
    }
}

function getNewsResponse(news) {
    return {
        type : types.GET_NEWS_RESPONSE,
        news : news.articles
    }
}