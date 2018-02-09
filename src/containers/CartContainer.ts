import { StoreState } from '../types';
import { connect, Dispatch } from 'react-redux';
import { 
  ActionTypes,
  removePizzaFromCart,
 } from '../actions';
import { 
  getPizzasInCartWithCalculatedTotalPrice,
  getTotalPriceInCart,
} from '../selectors';
import Cart from '../components/Cart';

const mapStateToProps = (state: StoreState) => ({
  pizzasInCart: getPizzasInCartWithCalculatedTotalPrice(state),
  totalPriceInCart: getTotalPriceInCart(state),
});

const mapDispatchToProps = (dispatch: Dispatch<ActionTypes>) => ({
  removePizza: (index: number) => dispatch(removePizzaFromCart(index)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
