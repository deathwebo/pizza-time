import { StoreState } from '../types';
import { connect, Dispatch } from 'react-redux';
import { 
  ActionTypes,
  setSelectedInCurrentPizzaTopping,
 } from '../actions';
import PizzaCustomizer from '../components/PizzaCustomizer';

const mapStateToProps = (state: StoreState) => ({
  currentPizza: state.currentPizza,
});

const mapDispatchToProps = (dispatch: Dispatch<ActionTypes>) => ({
  setToppingSelected: (pizzaName: string, toppingName: string, selected: boolean) =>
    dispatch(setSelectedInCurrentPizzaTopping(pizzaName, toppingName, selected)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PizzaCustomizer);