import React from 'react';
import connect from '../connect';
import { Droppable, Draggable } from '../components/DragNDrop'
import projector from './projector';

const getCartList = projector([
	state => state.cart.list,
	state => state.entities.courses
],(list, entities)=>(
	{ cart_list: list.map(id => entities[id]) }
))

const CartNavContainer = connect(
	getCartList,
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