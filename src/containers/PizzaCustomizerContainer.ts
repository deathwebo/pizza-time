import { StoreState, CurrentPizza } from '../types';
import { connect, Dispatch } from 'react-redux';
import { 
  ActionTypes,
  setSelectedInCurrentPizzaTopping,
  clearCurrentPizza,
  addPizzaToCart,
 } from '../actions';
import { 
  getCurrentPizza,
  getCurrentPizzaTotalprice,
} from '../selectors';
import PizzaCustomizer from '../components/PizzaCustomizer';

const mapStateToProps = (state: StoreState) => ({
  currentPizza: getCurrentPizza(state),
  currentTotalPrice: getCurrentPizzaTotalprice(state),
});

const mapDispatchToProps = (dispatch: Dispatch<ActionTypes>) => ({
  setToppingSelected: (pizzaName: string, toppingName: string, selected: boolean) =>
    dispatch(setSelectedInCurrentPizzaTopping(pizzaName, toppingName, selected)),
  clearCurrentPizza: () => dispatch(clearCurrentPizza()),
  addPizzaToCart: (pizza: CurrentPizza) => {
    dispatch(addPizzaToCart(pizza));
    dispatch(clearCurrentPizza());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PizzaCustomizer);