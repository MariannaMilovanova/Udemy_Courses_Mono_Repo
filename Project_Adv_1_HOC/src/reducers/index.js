import { combineReducers } from 'redux';
import authenticatioReducer from './authentication';

const rootReducer = combineReducers({
  authenticated: authenticatioReducer
});

export default rootReducer;
