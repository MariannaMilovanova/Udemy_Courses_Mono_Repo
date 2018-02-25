import React, { Component } from 'react';
import SearchBar from '../containers/search_bar'
import WheatherList from '../containers/weather_list'

export default class App extends Component {
  render() {
    return (
      <div>
        <SearchBar />
        <WheatherList/>
      </div>
    );
  }
}
