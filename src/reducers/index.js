import { combineReducers } from 'redux';
import fuelSavings from './fuelSavingsReducer';
import appData from './dataReducer';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  fuelSavings,
  appData,
  routing: routerReducer
});

export default rootReducer;
