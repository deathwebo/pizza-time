import { createSelector } from 'reselect';
import { 
  StoreState,
  CurrentPizza,
  Pizza,
  AvailablePizzaSize,
  Topping,
  PizzaWithTotalPice,
} from '../types';

export const getPizzasInCart = (state: StoreState): Pizza[] => state.cart;
export const getCurrentPizza = (state: StoreState): CurrentPizza | null => 
  state.currentPizza;
export const getAvailablePizzas = (state: StoreState): AvailablePizzaSize[] => 
  state.availablePizzaSizes;

export const getCurrentPizzaTotalprice = createSelector(
  [getCurrentPizza],
  (currentPizza: CurrentPizza | null): number => {
    if (currentPizza === null) {
      return 0;
    }

    const totalToppingsPrice = currentPizza.toppings.reduce(
      (acc, topping) => {
        if (!topping.selected) {
          return acc;
        }

        return acc + topping.price;
      }, 
      0,
    );

    return currentPizza.basePrice + totalToppingsPrice;
  },
);

function calculateTotalPriceForAPizza(pizza: Pizza): number {
  const toppingsTotal = pizza.toppings.reduce(
    (toppingAccumulator: number, topping: Topping) => (
        toppingAccumulator + topping.price
    ),
    0,
  );
  return toppingsTotal + pizza.basePrice;
}

export const getCartCurrentTotalPrice = createSelector(
  [getPizzasInCart],
  (pizzasInCart: Pizza[]): number => {
    return pizzasInCart.reduce(
      (pizzaAccumulator: number, pizza: Pizza) => {
        const pizzaTotalPrice = calculateTotalPriceForAPizza(pizza);
        return pizzaAccumulator + pizzaTotalPrice;
      },
      0,
    );
  },
);

interface ToppingInfo {
  names: string;
  totalPrice: number;
}

interface ToppingsReduction {
  names: string[];
  totalPrice: number;
}

function getToppingNamesAndTotalPrice(toppings: Topping[]): ToppingInfo {
  const info = toppings.reduce(
    (acc: ToppingsReduction, topping: Topping) => {
      return { 
        names: acc.names.concat(topping.name),
        totalPrice: acc.totalPrice + topping.price,
      };
    }, 
    { 
      names: [], 
      totalPrice: 0 
    },
  );
  
  const joinedNames = info.names.join();
  return {
    names: joinedNames,
    totalPrice: info.totalPrice,
  };
}

export const getPizzasInCartWithCalculatedTotalPrice = createSelector(
  [getPizzasInCart],
  (pizzasInCart: Pizza[]): PizzaWithTotalPice[] => {
    return pizzasInCart.map((pizza: Pizza) => {
      const toppingsInfo = getToppingNamesAndTotalPrice(pizza.toppings);
      const pizzaTotalprice = pizza.basePrice + toppingsInfo.totalPrice;

      return {
        name: pizza.name,
        toppingsNames: toppingsInfo.names,
        totalPrice: pizzaTotalprice,
      };
    });
  },
);

export const getTotalPriceInCart = createSelector(
  [getPizzasInCartWithCalculatedTotalPrice],
  (pizzas: PizzaWithTotalPice[]): number => {
    return pizzas.reduce(
      (acc, pizza: PizzaWithTotalPice) => (acc + pizza.totalPrice),
      0,
    );
  },
);

export const getCurrentPizzaTotalSelectedToppings = createSelector(
  [getCurrentPizza],
  (pizza: CurrentPizza | null): number => {
    if (pizza === null) {
      return 0;
    }
    return pizza.toppings.filter(topping => topping.selected).length;
  },
);