import jsdom from 'jsdom';
import _$ from 'jquery';
import TestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';
import chai, { expect } from 'chai';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../src/reducers';
import chaiJquery from 'chai-jquery';

//Set up testing environment to run like a browser in the command line
//window --> == global
global.document = jsdom.jsdom('<!doctype html><html><body></body><html>');
global.window = global.document.defaultView;
const $ = _$(global.window);

//build 'renderComponent' helper that should render a given react cless
function renderComponent(ComponentClass, props, state) {
  const componentInstance = TestUtils.renderIntoDocument(
    <Provider store={createStore(reducers, state)}>  
      <ComponentClass {...props} />
    </Provider>
  );

  return $(ReactDOM.findDOMNode(componentInstance)); // produces HTML
}

//Build helper for simulating events
$.fn.simulate = function(eventName, value) {
  //$('div').simulate() - here 'this' will be $('div'), this[0] will be first div
  if(value) {
    this.val(value); // val - jqure method to pass value
  }
  TestUtils.Simulate[eventName](this[0]);
}

//Set up chai-jquery
chaiJquery(chai, chai.util, $)

export { renderComponent, expect };