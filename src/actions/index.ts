import { ThunkAction } from 'redux-thunk';
import { Dispatch } from 'react-redux';
import {
  ReceivedPizzaSize,
  AvailablePizzaSize,
  Pizza,
  CurrentPizza,
  Topping,
  StoreState,
} from '../types';
import ApiService from '../utils/ApiService';

export enum TypeKeys {
  RECEIVE_AVAILABLE_PIZZA_SIZES = 'RECEIVE_AVAILABLE_PIZZA_SIZES',
  SET_CURRENT_PIZZA = 'SET_CURRENT_PIZZA',
  CLEAR_CURRENT_PIZZA = 'CLEAR_CURRENT_PIZZA',
  ADD_PIZZA_TO_CART = 'ADD_PIZZA_TO_CART',
  REMOVE_PIZZA_FROM_CART = 'REMOVE_PIZZA_FROM_CART',
  SET_SELECTED_IN_CURRENT_PIZZA_TOPPING = 'SET_SELECTED_IN_CURRENT_PIZZA_TOPPING',
  REQUEST_AVAILABLE_PIZZA_SIZES = 'REQUEST_AVAILABLE_PIZZA_SIZES',
}

export interface ReceiveAvailablePizzaSizes {
  type: TypeKeys.RECEIVE_AVAILABLE_PIZZA_SIZES;
  pizzaSizes: AvailablePizzaSize[];
}

export interface AddPizzaToCart {
  type: TypeKeys.ADD_PIZZA_TO_CART;
  pizza: Pizza;
}

export interface RemovePizzaFromCart {
  type: TypeKeys.REMOVE_PIZZA_FROM_CART;
  pizzaName: string;
}

export interface SetSelectedInCurrentPizzaTopping {
  type: TypeKeys.SET_SELECTED_IN_CURRENT_PIZZA_TOPPING;
  toppingName: string;
  selected: boolean;
}

export interface SetCurrentPizza {
  type: TypeKeys.SET_CURRENT_PIZZA;
  currentPizza: CurrentPizza;
}

export interface ClearCurrentPizza {
  type: TypeKeys.CLEAR_CURRENT_PIZZA;
}

export interface RequestAvailablePizzaSizes {
  type: TypeKeys.REQUEST_AVAILABLE_PIZZA_SIZES;
}

export type ActionTypes = ReceiveAvailablePizzaSizes | AddPizzaToCart | RemovePizzaFromCart 
  | SetSelectedInCurrentPizzaTopping | SetCurrentPizza | ClearCurrentPizza | RequestAvailablePizzaSizes;

export function receiveAvailablePizzaSizes(receivedPizzaSizes: ReceivedPizzaSize[]): ReceiveAvailablePizzaSizes {
  const pizzaSizes = receivedPizzaSizes.map(receivedPizzaSize => {
    const toppings = receivedPizzaSize.toppings.map(toppingEntry => {
      const { topping, ...otherProperties } = toppingEntry;
      return {
        ...topping,
        ...otherProperties,
      };
    });

    return {
      ...receivedPizzaSize,
      toppings,
    };
  });

  return {
    pizzaSizes,
    type: TypeKeys.RECEIVE_AVAILABLE_PIZZA_SIZES,
  };
}

export function addPizzaToCart(pizzaToAdd: CurrentPizza): AddPizzaToCart {
  const toppings = pizzaToAdd.toppings.reduce(
    (acc: Topping[], currentPizzaTopping) => {
      if (currentPizzaTopping.selected) {
        const { name, price } = currentPizzaTopping;
        const topping = { name, price };
        acc.push(topping);
      }

      return acc;
    }, 
    []
  );

  const pizza = { ...pizzaToAdd, toppings };

  return {
    pizza,
    type: TypeKeys.ADD_PIZZA_TO_CART,
  };
}

export function removePizzaFromCart(pizzaName: string): RemovePizzaFromCart {
  return {
    pizzaName,
    type: TypeKeys.REMOVE_PIZZA_FROM_CART,
  };
}

export function setSelectedInCurrentPizzaTopping(
  pizzaName: string,
  toppingName: string,
  selected: boolean
): SetSelectedInCurrentPizzaTopping {
  return {
    toppingName,
    selected,
    type: TypeKeys.SET_SELECTED_IN_CURRENT_PIZZA_TOPPING,
  };
}

export function setCurrentPizza(pizza: AvailablePizzaSize): SetCurrentPizza {
  const toppings = pizza.toppings.map(topping => {
    return {
      name: topping.name,
      price: topping.price,
      selected: topping.defaultSelected,
    };
  });

  const currentPizza = { ...pizza, toppings };

  return {
    type: TypeKeys.SET_CURRENT_PIZZA,
    currentPizza,
  };
}

export function clearCurrentPizza(): ClearCurrentPizza {
  return {
    type: TypeKeys.CLEAR_CURRENT_PIZZA,
  };
}

export function requestAvailablePizzaSizes(): RequestAvailablePizzaSizes {
  return {
    type: TypeKeys.REQUEST_AVAILABLE_PIZZA_SIZES,
  };
}

export const fetchAvailablePizzaSizes = 
  (): ThunkAction<void, StoreState, null> => 
    (dispatch: Dispatch<StoreState>) => {
      dispatch(requestAvailablePizzaSizes());
      const apiService = new ApiService();

      apiService
        .fetchAllPizzaSizes()
        .then((result) => dispatch(
          receiveAvailablePizzaSizes(result.data.pizzaSizes)
        ));
    };

// export function fetchAvailablePizzaSizes() {
//   return (dispatch: Dispatch<StoreState>) => {
//     dispatch(requestAvailablePizzaSizes());
//     const apiService = new ApiService();

//     apiService
//       .fetchAllPizzaSizes()
//       .then((result) => dispatch(
//         receiveAvailablePizzaSizes(result.data.pizzaSizes)
//       ));
//   };
// }
