import * as React from 'react';
import { PizzaWithTotalPice } from '../types';

interface Props {
  pizzasInCart: PizzaWithTotalPice[];
  totalPriceInCart: number;
  removePizza: (index: number) => void;
}

const Cart = (props: Props) => (
  <div>
    <h2>Pizza Cart</h2>
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
      {props.pizzasInCart.map((pizza, idx) => {
        return (
          <tr key={idx}>
            <td>{pizza.name}</td>
            <td>{pizza.toppingsNames}</td>
            <td>{pizza.totalPrice}</td>
            <td>
              <button
                type="button"
                onClick={(e) => props.removePizza(idx)}
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
