import React from 'react';
import {CartButtonContainer} from '../containers/buttons'

export const CartDetails = (props) => (
	<div className="course_details text-center">
		<h1 className="thumbnail">{props.data.price} PLN</h1>
		<CartButtonContainer course={props.data} />
	</div>
)