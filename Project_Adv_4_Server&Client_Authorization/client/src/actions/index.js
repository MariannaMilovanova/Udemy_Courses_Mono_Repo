import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_ERROR, AUTH_USER, UNAUTH_USER, FETCH_MESSAGE } from './types';
const ROOT_URL = 'http://localhost:3090';

export function signinUser({ email, password }) {
  return function(dispatch) {
    //dispatch({ type: ...})
    //Submit email/password to the server
    axios
      .post(`${ROOT_URL}/signin`, { email, password })
      //If request is good...
      // - Update state to indicate user is authenticated
      .then(res => {
        dispatch({ type: AUTH_USER });
        // - Save the JWT token
        localStorage.setItem('token', res.data.token);
        // - redirect to the route '/feature'
        browserHistory.push('/feature');
      })
      .catch(() => {
        //If request is bad...
        // - Show an error to the user
        dispatch(authError('Bad Login Info'));
      });
  };
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function signoutUser() {
  localStorage.removeItem('token');
  return {
    type: UNAUTH_USER
  };
}

export function signupUser({ email, password }) {
  return function(dispatch) {
    axios
      .post(`${ROOT_URL}/signup`, { email, password })
      .then(res => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', res.data.token);
        browserHistory.push('/feature');
      })
      .catch(resp => {
        dispatch(authError(resp.response.data.error));
      });
  };
}

export function fetchMessage() {
  return function(dispatch) {
    axios
      .get(ROOT_URL, {
        headers: {
          authorization: localStorage.getItem('token')
        }
      })
      .then(res => {
        dispatch({
          type: FETCH_MESSAGE,
          payload: res.data.message
        });
      });
  };
}
