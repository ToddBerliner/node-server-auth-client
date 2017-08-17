import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer';

const rootReducer = combineReducers({
  // form property of state will be produced by the redux-form reducer
  form, // aka form: form
  auth: authReducer
});

export default rootReducer;
