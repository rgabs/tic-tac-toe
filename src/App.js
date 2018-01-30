import './App.css';
import Box from './components/Box/Box.component';
import React, {Component} from 'react';
class App extends Component {
  render () {
    return (
      <div className='box-container'>
        <Box />
      </div>
    );
  }
}

export default App;
