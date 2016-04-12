import React from 'react';
import {render} from 'react-dom';
import AwesomeComponent from './AwesomeComponent.jsx';

class App extends React.Component {
  render(){
    return(
      <p>Hello!</p>
      <AwesomeComponent/>
    );
  }
}

render(<App/>, document.getElementById('app'));
