import * as React from 'react';
import PizzaSizeSelectorContainer from '../containers/PizzaSizeSelectorContainer';
import PizzaCustomizerContainer from '../containers/PizzaCustomizerContainer';
import CartContainer from '../containers/CartContainer';

import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h1>Pizza Time</h1>
        <PizzaSizeSelectorContainer />
        <PizzaCustomizerContainer />
        <CartContainer />
      </div>
    );
  }
}

export default App;
