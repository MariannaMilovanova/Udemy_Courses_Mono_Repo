import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import logger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, browserHistory } from 'react-router';
import requireAuth from './components/require_authentication';
import App from './components/app';
import reducers from './reducers';
import Resources from './components/resources';
const createStoreWithMiddleware = applyMiddleware(logger)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={browserHistory}>
        <Route path='/' component={App}>
            <Route path='resources' component={requireAuth(Resources)} />
        </Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));
