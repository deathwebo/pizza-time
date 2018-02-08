import * as React from 'react';
import { CurrentPizza } from '../types';

interface Props {
  currentPizza: CurrentPizza | null;
  setToppingSelected: (pizzaName: string, toppingName: string, selected: boolean) => void;
}

const PizzaCustomizer = (props: Props) => {
  if (props.currentPizza === null) {
    return null;
  }
  const { currentPizza } = props;
  return (
    <div>
      <div>
        <p>{currentPizza.name}</p>
      </div>
      <div>
        <ul>
          {currentPizza.toppings.map(topping => (
            <li key={topping.name}>
              <span>{topping.name} (${topping.price})</span>
              <input 
                type="checkbox" 
                onChange={(e) => props.setToppingSelected(
                  currentPizza.name,
                  topping.name,
                  e.target.checked
                )}
              />
            </li>
          ))}
        </ul>
      </div>    
    </div>
  );
};

export default PizzaCustomizer;