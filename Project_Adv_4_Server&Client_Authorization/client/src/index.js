import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import Signin from './components/auth/signin';
import reduxThunk from 'redux-thunk';
import App from './components/app';
import reducers from './reducers';
import logger from 'redux-logger';
import Signout from './components/auth/signout';
import Signup from './components/auth/signup';
import Feature from './components/feature';
import RequireAuth from './components/auth/require_auth';
import Welcome from './components/welcome';
import { AUTH_USER } from './actions/types';

const createStoreWithMiddleware = applyMiddleware(reduxThunk, logger)(
  createStore
);

const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');
//If we have a token, consider the user to be sign in;
if (token) {
  //we nee to update application state;
  store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Welcome} />
        <Route path="signin" component={Signin} />
        <Route path="signout" component={Signout} />
        <Route path="signup" component={Signup} />
        <Route path="feature" component={RequireAuth(Feature)} />
      </Route>
    </Router>
  </Provider>,
  document.querySelector('.container')
);
