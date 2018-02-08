import * as React from 'react';
import PizzaSizeSelectorContainer from '../containers/PizzaSizeSelectorContainer';

import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <PizzaSizeSelectorContainer />
        {/* <PizzaCustomizer />
        <Cart /> */}
      </div>
    );
  }
}

export default App;
