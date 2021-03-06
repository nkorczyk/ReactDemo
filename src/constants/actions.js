
const ACTIONS = {
	START_LOADING: Symbol('START_LOADING'),
	STOP_LOADING: Symbol('STOP_LOADING'),
	LOAD_COURSES: Symbol('LOAD_COURSES'),
	LOAD_MORE_COURSES: Symbol('LOAD_MORE_COURSES'),
	SAVE_COURSE: Symbol('SAVE_COURSE'),
	LOAD_FAVOURITES: Symbol('LOAD_FAVOURITES'),
	ADD_TO_FAVOURITES: Symbol('ADD_TO_FAVOURITES'),
	REMOVE_FROM_FAVOURITES: Symbol('REMOVE_FROM_FAVOURITES'),
	LOAD_CART: Symbol('LOAD_CART'),
	ADD_TO_CART: Symbol('ADD_TO_CART'),
	REMOVE_FROM_CART: Symbol('REMOVE_FROM_CART'),
	LOAD_SEARCH_RESULTS: Symbol('LOAD_SEARCH_RESULTS'),
	SELECT_IN_SEARCH_RESULTS: Symbol('SELECT_IN_SEARCH_RESULTS'),
}

export default ACTIONS;