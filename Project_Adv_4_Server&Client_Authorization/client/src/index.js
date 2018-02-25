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

const createStoreWithMiddleware = applyMiddleware(reduxThunk, logger)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={browserHistory}>
        <Route path='/' component={App}>
          <Route path='signin' component={Signin}/>
        </Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));
