// Interfaces related to the State

interface PizzaSize {
  name: string;
  maxToppings: number;
  basePrice: number;
}

export interface AvailableTopping {
  name: string;
  price: number;
  defaultSelected: boolean;
}

export interface AvailablePizzaSize extends PizzaSize {
  toppings: AvailableTopping[];
}

export interface Topping {
  name: string;
  price: number;
}

export interface Pizza extends PizzaSize {
  toppings: Topping[];
}

export interface CurrentPizzaTopping {
  name: string;
  price: number;
  selected: boolean;
}

export interface CurrentPizza extends PizzaSize {
  toppings: CurrentPizzaTopping[];
}

// Application state interface
export interface StoreState {
  availablePizzaSizes: AvailablePizzaSize[];
  currentPizza: CurrentPizza | null;
  cart: Pizza[];
  isLoading: boolean;
}

// Other interfaces

export interface ReceivedPizzaTopping {
  name: string;
  price: number;
}

export interface ToppingEntry {
  topping: ReceivedPizzaTopping;
  defaultSelected: boolean;
}

export interface ReceivedPizzaSize extends PizzaSize {
  toppings: ToppingEntry[];
}