import * as React from 'react';
import { PizzaWithTotalPice } from '../types';

interface Props {
  pizzasInCart: PizzaWithTotalPice[];
  totalPriceInCart: number;
  removePizza: (pizzaName: string) => void;
}

const Cart = (props: Props) => (
  <div>
    <h2>Your cart</h2>
    <table>
      <thead>
        <tr>
          <th>Size</th>
          <th>Toppings</th>
          <th>Pizza total price</th>
          <th>remove</th>
        </tr>
      </thead>
      <tbody>
      {props.pizzasInCart.map(pizza => {
        return (
          <tr key={pizza.name}>
            <td>{pizza.name}</td>
            <td>{pizza.toppingsNames}</td>
            <td>{pizza.totalPrice}</td>
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
    <p>
      <strong>Your total is ${props.totalPriceInCart}</strong>
    </p>
  </div>
);

export default Cart;
