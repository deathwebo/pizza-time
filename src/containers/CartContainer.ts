import { StoreState } from '../types';
import { connect, Dispatch } from 'react-redux';
import { 
  ActionTypes,
  removePizzaFromCart,
 } from '../actions';
import Cart from '../components/Cart';

const mapStateToProps = (state: StoreState) => ({
  pizzasInCart: state.cart,
});

const mapDispatchToProps = (dispatch: Dispatch<ActionTypes>) => ({
  removePizza: (pizzaName: string) => dispatch(removePizzaFromCart(pizzaName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
