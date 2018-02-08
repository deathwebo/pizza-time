import {
  TypeKeys,
  ActionTypes,
} from '../actions';
import { StoreState } from '../types';

export function appReducer(state: StoreState, action: ActionTypes): StoreState {
  switch (action.type) {
    case TypeKeys.RECEIVE_AVAILABLE_PIZZA_SIZES:
      return { 
        ...state,
        availablePizzaSizes: action.pizzaSizes,
      };

    case TypeKeys.ADD_PIZZA_TO_CART:
      return {
        ...state,
        cart: state.cart.concat(action.pizza),
      };

    case TypeKeys.REMOVE_PIZZA_FROM_CART: {
      const cart = state.cart.filter(pizza => pizza.name !== action.pizzaName);
      return { ...state, cart };
    }

    case TypeKeys.SET_SELECTED_IN_CURRENT_PIZZA_TOPPING: {
      if (state.currentPizza === null) {
        return state;
      }

      const toppings = state.currentPizza.toppings.map(topping => {
        if (topping.name !== action.toppingName) {
          return topping;
        }

        return {
          ...topping,
          selected: action.selected,
        };
      });

      const currentPizza = {
        ...state.currentPizza,
        toppings,
      };

      return { 
        ...state,
        currentPizza, 
      };
    }

    case TypeKeys.SET_CURRENT_PIZZA:
      return {
        ...state,
        currentPizza: action.currentPizza,
      };
    
    case TypeKeys.CLEAR_CURRENT_PIZZA:
      return {
        ...state,
        currentPizza: null,
      };

    default:
      return state;
  }
}
