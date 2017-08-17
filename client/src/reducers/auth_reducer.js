import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, SIGNUP_ERROR } from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case AUTH_USER:
      return { ...state, authenticated: true }
    case UNAUTH_USER:
      return { ...state, authenticated: false }
    case AUTH_ERROR:
      return { ...state, error: action.payload }
    case SIGNUP_ERROR:
      const newState = { ...state, signupError: action.payload }
      return newState;
  }

  return state;
}
