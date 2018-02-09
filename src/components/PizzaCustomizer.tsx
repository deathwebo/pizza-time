import * as React from 'react';
import { CurrentPizza } from '../types';

interface Props {
  currentPizza: CurrentPizza | null;
  currentTotalPrice: number;
  setToppingSelected: (pizzaName: string, toppingName: string, selected: boolean) => void;
  clearCurrentPizza: () => void;
  addPizzaToCart: (pizza: CurrentPizza) => void;
  totalSelectedToppings: number;
}

const PizzaCustomizer = (props: Props) => {
  if (props.currentPizza === null) {
    return null;
  }
  const { currentPizza } = props;
  const maxToppingsMessage = (currentPizza.maxToppings === null 
    ? 'no limit!' 
    : currentPizza.maxToppings
  );
  return (
    <div>
      <h2>Select the toppings of your choice for your pizza</h2>
      <div>
        <p>Customizing a {currentPizza.name} pizza</p>
        <p>
          Base price <strong>${currentPizza.basePrice}</strong>, 
          max. number of toppings: <strong>{maxToppingsMessage}</strong>
        </p>
      </div>
      <div>
        <ul>
          {currentPizza.toppings.map(topping => {
            let disabled = false;
            if (currentPizza.maxToppings !== null) {
              disabled = (props.totalSelectedToppings >= currentPizza.maxToppings)
                && !topping.selected;
            }
            return (
              <li key={topping.name}>
                <span>{topping.name} (${topping.price})</span>
                <input 
                  type="checkbox" 
                  onChange={(e) => props.setToppingSelected(
                    currentPizza.name,
                    topping.name,
                    e.target.checked
                  )}
                  checked={topping.selected}
                  disabled={disabled}
                />
              </li>
            );
          })}
        </ul>
        <div>
          <strong>This pizza total ${props.currentTotalPrice}</strong>
          <button
            type="button"
            onClick={() => props.addPizzaToCart(currentPizza)}
          >
            ADD
          </button>
          <button
            type="button"
            onClick={() => props.clearCurrentPizza()}
          >
            CLEAR
          </button>
        </div>
      </div>    
    </div>
  );
};

export default PizzaCustomizer;