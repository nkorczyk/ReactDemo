import {ShoppingCartList} from '../components/ShoppingCartList';
import {FavouritesCoursesList} from '../components/FavouritesCoursesList';
import {CoursesList} from '../components/CoursesList';
import connect from '../connect';
import React from 'react';
import projector from './projector';


const getCoursesList = (listSelector) => projector([
	listSelector,
	state => state.entities.courses
], (list, entities) =>(
	{
		list: list.map(id => entities[id])
	}
))

export const CoursesListContainer = connect(
	getCoursesList( state => state.courses.paged_list ),
	({loadMore})=>({ loadMore })
)((props)=>(
<div>
	<CoursesList {...props} />
	<hr />
	<button className="btn btn-default btn-block" onClick={props.loadMore}> Pokaż więcej ... </button>
</div>
));

export const ShoppingCartListContainer = connect(getCoursesList( state => state.cart.list ))(ShoppingCartList)

export const FavouritesCoursesListContainer = connect(getCoursesList( state => state.favourites.list ))(FavouritesCoursesList)