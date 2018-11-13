import React from 'react';
import connect from '../connect';
import { Droppable, Draggable } from '../components/DragNDrop'

const CartNavContainer = connect(
	({cart})=>({ cart_list: cart.list }),
	({addToCart})=>({ addToCart }),
	(state,actions,props)=>({
		cart_size: state.cart_list.length,
		onDrop: (data)=>actions.addToCart(data)
	})
)((props)=>(
	<Droppable onDrop={props.onDrop}>
		<span className="glyphicon glyphicon-shopping-cart"></span> Koszyk {props.cart_size}
	</Droppable>
))

export default CartNavContainer;