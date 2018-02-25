import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PostTest from './components/post_test';
import logger from 'redux-logger';
import promise from 'redux-promise';
import reducers from './reducers';
import PostIndex from './components/post_index';
import PostNew from './components/post_new';
import PostsShow from './components/post_show';

const createStoreWithMiddleware = applyMiddleware(logger, promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/posts/new" component={PostNew}/>
          <Route path="/posts/test" component={PostTest}/>
          <Route path="/posts/:id" component={PostsShow}/>
          <Route path="/" component={PostIndex}/>
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
