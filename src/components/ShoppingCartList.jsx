import React from 'react';
import Button from './Button';
import {Course} from './Course';
import {CartDetails} from './CartDetails';
import {FavButtonContainer} from '../containers/buttons'

export const ShoppingCartList = ({list}) =>(
	<div>
		<h1> Koszyk </h1>
		<hr />
		<div>
			{list.map((data) => <Course data={data} key={data.id} Details={CartDetails}>
				<div className="btn-group pull-right">
					<Button label="Szczególy kursu" onClick={()=> context.router.push('/kursy/'+data.id)} />
					<FavButtonContainer id={data.id}  />
				</div>
				<div><b>Autor: </b> {data.author} <br/> <b>Czas trwania: </b> {data.duration} </div>
			</Course>)}
		</div>
	</div>
)