import React, { Component } from 'react';
// import logo from './logo.svg';
import { Calendar } from './blocks/Calendar/Calendar';

import data from './events.js';

class App extends Component {
  render() {
    return (
      <Calendar data={data} />
    );
  }
}

export default App;
