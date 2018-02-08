import * as React from 'react';
import { Pizza, Topping } from '../types';

interface Props {
  pizzasInCart: Pizza[];
  removePizza: (pizzaName: string) => void;
}

interface ToppingInfo {
  names: string;
  totalPrice: number;
}

function getToppingNamesAndTotalPrice(toppings: Topping[]): ToppingInfo {
  return toppings.reduce(
    (acc: ToppingInfo, topping: Topping) => {
      const names = `${acc.names}, ${topping.name}`;
      const totalPrice = acc.totalPrice + topping.price;

      return { names, totalPrice };
    }, 
    { names: '', totalPrice: 0 },
  );
}

const Cart = (props: Props) => (
  <div>
    <table>
      <thead>
        <tr>
          <th>Size</th>
          <th>Toppings</th>
          <th>Total price</th>
          <th>remove</th>
        </tr>
      </thead>
      <tbody>
      {props.pizzasInCart.map(pizza => {
        const toppingInfo = getToppingNamesAndTotalPrice(pizza.toppings);
        const totalPrice = pizza.basePrice + toppingInfo.totalPrice;
        return (
          <tr key={pizza.name}>
            <td>{pizza.name}</td>
            <td>{toppingInfo.names}</td>
            <td>{totalPrice}</td>
            <td>
              <button
                type="button"
                onClick={(e) => props.removePizza(pizza.name)}
              >
                remove
              </button>
            </td>
          </tr>
        );
      })}
      </tbody>
    </table>
  </div>
);

export default Cart;
