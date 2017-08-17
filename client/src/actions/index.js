import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER, SIGNUP_ERROR } from './types';

const API_URL = 'http://localhost:3090';

export function signupUser({ email, password }) {

  return function(dispatch) {
    axios.post(`${API_URL}/signup`, { email, password })
      .then(response => {
        const action = { type: AUTH_USER };
        dispatch(action);
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/signedup');
      })
      .catch((err) => {
        console.log(err);
        dispatch(signupError('Unknown error, this is a crappy place to catch errors.'))
      });
  }
}

export function signinUser({ email, password }) {

  return function(dispatch) {
    // this function with reduxThunk gives us direct access to the Dispatch method
    // here we can make async requests or do whatever we want
    // then, when we are ready, we can call the dispatch method with a
    // "normal" redux action { type: FETCH_POST, payload: shit_we_just_got }
    // thus, we can dispatch many actions via reduxThunk rather than just 1

    // also, the action, signiUser, can call dispatch whenever it wants INSTEAD
    // of imediately

    // submit creds to server
    // remember { email, password } == { email: email, password: password }
    axios.post(`${API_URL}/signin`, { email, password })
      .then(response => {
        // if authed
        // - update authed state of state
        dispatch({ type: AUTH_USER });
        // - save JWT token
        localStorage.setItem('token', response.data.token);
        // - redirect to the rout '/protected'
        browserHistory.push('/protected');
      })
      .catch(() => {
        // if ! authed
        // - show error to user
        dispatch(authError('The email and password do not work'));
      });
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

export function signupError(error) {
  const action = {
    type: SIGNUP_ERROR,
    payload: error
  }
  return action;
}

export function signoutUser() {
  // remove JTW token
  localStorage.removeItem('token');
  // return action
  return {
    type: UNAUTH_USER
  }
}
