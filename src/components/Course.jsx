import React from 'react';
import {Rating} from './Rating'
import {CartButton} from './Cart'

export const CourseDetails = ({data}) => (
	<div>
	  	<table className="table course_details">
	  		<tbody>
	  			<tr>
	  				<th>Ocena</th>
	  				<td>
	  					<Rating max={5} value={3} />
	  				</td>
		  		</tr>
		  		<tr>
		  			<th>Autor</th>
		  			<td>{data.author}</td>
	  			</tr>
		  		<tr>
		  			<th>Czas trwania</th>
		  			<td>{data.duration}</td>
	  			</tr>
		  		<tr>
		  			<th>Cena</th>
		  			<td>{data.price} PLN</td>
	  			</tr>
	  		</tbody>
	  	</table>
		<CartButton course={data}/>
	</div>
)

import { Link } from 'react-router';


export const CourseMedia = ({data}) => ( <img src={data.image} alt="cover" />)

export const NewLabel = ({data}) => ( data.is_new? <span className="label label-default">Nowy!</span> : null)

export const CoursePromoLabel = ({data}) => ( data.is_promo? <b>Kurs jest w PROMOCJI!</b> : null)

export const Course = (props) => {
	const {data, Details} = props;

	return (
	  	<div className="media course">

	  		{/* Course media column */}
	  		<div className="media-left">
	  			<CourseMedia {...props} />
	  		</div>

	  		{/* Course content column */}
	  		<div className="media-body">
		  		<h3><Link to={ 'kursy/' + data.id } >{data.title}</Link> <NewLabel {...props} /></h3>
	  			<p>{data.description}</p>

		  		{props.children}
	  		</div>

		  	{/* Course details column */}
		  	{Details?
		  		<div className="media-right">
		  			<Details {...props} />
			  	</div> : null
			}
		</div>
	)
}