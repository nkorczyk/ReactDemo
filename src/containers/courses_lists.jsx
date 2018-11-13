import {ShoppingCartList} from '../components/ShoppingCartList';
import {FavouritesCoursesList} from '../components/FavouritesCoursesList';
import {CoursesList} from '../components/CoursesList';
import connect from '../connect';
import React from 'react';

export const CoursesListContainer = connect(
	({courses})=>({ list: courses.list}),
	({loadMore})=>({ loadMore })
)((props)=>(
<div>
	<CoursesList {...props} />
	<hr />
	<button className="btn btn-default btn-block" onClick={props.loadMore}> Pokaż więcej ... </button>
</div>
));

export const ShoppingCartListContainer = connect((state)=>({
	list: state.cart.list
}))(ShoppingCartList)

export const FavouritesCoursesListContainer = connect((state)=>({
	list: state.favourites.list
}))(FavouritesCoursesList)