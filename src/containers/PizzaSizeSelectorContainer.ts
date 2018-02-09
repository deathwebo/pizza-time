import { StoreState, AvailablePizzaSize } from '../types';
import { connect, Dispatch } from 'react-redux';
import { 
  ActionTypes,
  setCurrentPizza,
 } from '../actions';
import { getAvailablePizzas } from '../selectors';
import PizzaSizeSelector from '../components/PizzaSizeSelector';

const mapStateToProps = (state: StoreState) => ({
  availablePizzaSizes: getAvailablePizzas(state),
});

const mapDispatchToProps = (dispatch: Dispatch<ActionTypes>) => ({
  selectPizzaSize: (pizzaSize: AvailablePizzaSize) => dispatch(setCurrentPizza(pizzaSize)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PizzaSizeSelector);