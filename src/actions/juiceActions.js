import * as types from '../constants/actionTypes';
import Airtable from 'airtable';

// import {getFormattedDateTime} from '../utils/dates';

// encrypt API KEY
const API_KEY = 'needs to be encrypted'
//Connect to base of your choice
const BASE_ID = 'appwS8caNUMzpsFwb'
var base = new Airtable({apiKey: API_KEY}).base(BASE_ID);


// Airtable Supported Calls
export function setLoading (scope, loading) {
  return {
    type: types.SET_LOADING,
    payload: {
      scope,
      loading
    }
  }
}

export function fetchSuccess(scope, data, success) {
  return {
    type: types.FETCHING_SUCCESS,
    payload: {
    data,
    scope,
    success
    }
  }
}

export function fetchFailure(scope) {
  return {
    type: types.FETCHING_FAILURE,
    payload: {
      scope,
    }
  }
}

export function fetchAll (scope, amount, view) {
  return (dispatch) => {
    dispatch(setLoading(scope,true))
    let results = {}
    base(scope).select({
      // maxRecords: amount,
      view,
    }).eachPage( function page(records, fetchNextPage) {
      records.forEach(record => {
        results[record.id] = record.fields
      });
      fetchNextPage();
    }).then((data) => {
        dispatch(fetchSuccess(scope,results,true))
      })
      .catch((err) => {
        dispatch(fetchFailure(scope))
        console.log('err:', err)
      })
  }
}

// update for specific Record
export function fetchData(scope,id) {
  return (dispatch) => {
    dispatch(getData())
    base(scope).find(id)
      .then((data) => {
        dispatch(getDataSuccess({id, data: data.fields}))
      })
      .catch((err) => console.log('err:', err))
  }
}