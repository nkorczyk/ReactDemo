import { ShoppingCartList } from '../components/Cart';
import { FavouritesCoursesList } from '../components/FavouritesCoursesList';
import { CoursesList } from '../components/CoursesList';
import connect from '../connect';

export const CoursesListContainer = connect(({courses_list}) => ({
	list: courses_list
}))(CoursesList);

export const ShoppingCartListContainer = connect((state) => ({
	list: state.cart_list
}))(ShoppingCartList);

export const FavouritesCoursesListContainer = connect((state) => ({
	list: state.favourites_list
}))(FavouritesCoursesList);