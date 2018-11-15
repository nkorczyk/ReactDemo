import createStore from './createStore';
import ACTIONS from '../constants/actions'
import { dispatcher, dispatch } from '../appDispatcher'

import revisionStore from './revisionStore'
import configStore from './configStore'
import dataStore from './dataStore'
import createListStore from './createListStore'


const CoursesListStore = createListStore({
	name: 'COURSES',
	actions: {
		LOAD: ACTIONS.LOAD_COURSES,
		LOAD_MORE: ACTIONS.LOAD_MORE_COURSES
	}
})

dispatcher.register(function (action) {
	CoursesListStore.dispatch(action)
})

const FavouritesListStore = createListStore({
	name: 'FAVOURITES',
	actions: {
		ADD: ACTIONS.ADD_TO_FAVOURITES,
		REMOVE: ACTIONS.REMOVE_FROM_FAVOURITES
	}
})

dispatcher.register(function (action) {
	FavouritesListStore.dispatch(action)
})

const CartListStore = createListStore({
	name: 'CART',
	actions: {
		ADD: ACTIONS.ADD_TO_CART,
		REMOVE: ACTIONS.REMOVE_FROM_CART
	}
})

dispatcher.register(function (action) {
	CartListStore.dispatch(action)
})

const SearchResultsListStore = createListStore({
	name: 'SEARCH_RESULTS',
	actions: {
		LOAD: ACTIONS.LOAD_SEARCH_RESULTS,
		LOAD_MORE: 'LOAD_MORE_SEARCH_RESULTS',
		SELECT: ACTIONS.SELECT_IN_SEARCH_RESULTS
	}
})

dispatcher.register(function (action) {
	SearchResultsListStore.dispatch(action)
})

console.log(dispatch)

const AppStore = createStore({
	page: 1,
	courses_data: [],
	isLoading: false,

	config: {},

	entities: {},

	courses: {
		map: [],
		list: [],
		paged_list: []
	},

	authors: {
		map: [],
		list: [],
	},

	favourites: {
		map: {},
		list: []
	},

	cart: {
		map: {},
		list: []
	},

	search_results: {
		list: [],
		selected: null
	},

	revisions: {
		courses: {}
	}

}, function (action) {
	let payload = action.payload;
	let state = this.state;

	this.state.revisions = revisionStore.getState();
	this.state.config = configStore.getState();
	this.state.entities = dataStore.getState().entities;


	switch (action.type) {

		case ACTIONS.START_LOADING:
			this.state.isLoading = true;

			this.emitChange();
			break;

		case ACTIONS.STOP_LOADING:
			this.state.isLoading = false;

			this.emitChange();
			break;

		case ACTIONS.LOAD_SEARCH_RESULTS:

			state.search_results.list = SearchResultsListStore.getState().list
			state.search_results.query = action.meta.query;

			this.emitChange();
			break;

		case ACTIONS.SELECT_IN_SEARCH_RESULTS:

			state.search_results.selected = SearchResultsListStore.getState().selected

			this.emitChange();
			break;

		case ACTIONS.LOAD_COURSES:
			dispatcher.waitFor([dataStore.dispatchToken])

			state.courses.list = CoursesListStore.getState().list
			state.courses.paged_list = CoursesListStore.getState().paged_list
			state.courses.map = CoursesListStore.getState().map;

			state.authors.map = this.state.entities.authors;

			state.authors.list = Object.keys(state.authors.map).map(id => (
				state.authors.map[id]
			));

			this.emitChange();
			break;

		case ACTIONS.LOAD_MORE_COURSES:

			state.courses.paged_list = CoursesListStore.getState().paged_list

			this.emitChange();
			break;

		case ACTIONS.SAVE_COURSE:
			dispatcher.waitFor([dataStore.dispatchToken])
			// let course = payload.course;
			// let id = course.id;
			// if('undefined' === typeof id){
			// 	id = course.id = new Date();
			// 	state.courses_data.push(course);
			// 	state.courses.map[id] = course;
			// 	state.courses.list.unshift(course)
			// }else{
			// 	Object.assign(state.courses.map[id], course)
			// }

			state.search_results.list = SearchResultsListStore.getState().list
			state.search_results.selected = state.entities.courses[payload.course.id]

			this.emitChange();
			break;

		case ACTIONS.ADD_TO_FAVOURITES:
		case ACTIONS.REMOVE_FROM_FAVOURITES:

			this.state.favourites.list = FavouritesListStore.getState().list
			this.state.favourites.map = FavouritesListStore.getState().map;

			this.emitChange();
			break;

		case ACTIONS.ADD_TO_CART:
		case ACTIONS.REMOVE_FROM_CART:

			this.state.cart.list = CartListStore.getState().list
			this.state.cart.map = CartListStore.getState().map;

			this.emitChange();
			break;

	}

})


AppStore.subscribe(function () {
	console.log(AppStore.getState())
})


console.log(AppStore)

export default AppStore;
