import { combineReducers } from 'redux';
import appData from './dataReducer';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  appData,
  routing: routerReducer
});

export default rootReducer;
