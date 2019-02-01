import React, { Component } from 'react';
import './App.css';

//Data
import items from './data/menu';

//Components
import Header from './Components/Global/Header';
import Content from './Components/Global/Content';

class App extends Component {
  render() {
      return(
        <div className="App">
          <Header title="AC" items={items}></Header>
          <Content></Content>
        </div>
      )
  }
}

export default App;
