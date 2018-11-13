import React from 'react';
import Button from './Button'

export const CartButton = ({course, addToCart, removeFromCart, in_cart, className = "btn btn-block", icon, label}) => {
	let onClick= ()=>(
		in_cart? removeFromCart(course.id) : addToCart(course.id)
	) 

	return (in_cart? 
		<Button className={className + " btn-danger"} onClick={onClick} icon={icon || "remove"} label={label || "Usuń z koszyka"} /> :
		<Button className={className + " btn-success"} onClick={onClick} icon={icon || "shopping-cart"} label={label || "Dodaj do koszyka"} />
	)
}


