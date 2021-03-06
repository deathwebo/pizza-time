import * as React from 'react';
import { AvailablePizzaSize } from '../types';

interface Props {
  availablePizzaSizes: AvailablePizzaSize[];
  selectPizzaSize: (pizzaSize: AvailablePizzaSize) => void;
}

const PizzaSizeSelector = (props: Props) => (
  <div>
    <h2>Select a pizza size to customize</h2>
    {props.availablePizzaSizes.map((pizzaSize) => (
      <div key={pizzaSize.name}>
        <span>{pizzaSize.name}</span>
        <button
          type="button"
          onClick={() => props.selectPizzaSize(pizzaSize)}
        >
          Select
        </button>
      </div>
    ))}
  </div>
);

export default PizzaSizeSelector;