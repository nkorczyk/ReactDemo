import connect from '../connect';
import {FavButton} from '../components/FavButton';
import {CartButton} from '../components/Cart';

export const FavButtonContainer = connect(
	// state
	(state)=>({
		favourites: state.favourites.map,
		labels: state.labels
	}),
	// actions
	({addFavourite, removeFavourite})=>({
		addFavourite,
		removeFavourite
	}),
	// mergeProps
	(state, actions, props) => ({
		active: state.favourites[props.id],
		onActivate: () => actions.addFavourite(props.id),
		onDeactivate: () => actions.removeFavourite(props.id),
		labels: state.labels
	})
)(FavButton)

export const CartButtonContainer = connect(
	(state)=>({cart_map: state.cart.map }),
	(actions)=>({
		addToCart: actions.addToCart,
		removeFromCart: actions.removeFromCart,
	}),
	(state,actions,props)=>({
		in_cart: state.cart_map[props.course.id],
		...actions,
		...props
	})
)(CartButton)