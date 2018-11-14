import createStore from './createStore';
import ACTIONS from '../constants/actions';
import { dispatcher, dispatch } from '../appDispatcher';
import revisionStore from '../stores/revisionStore';
import configStore from '../stores/configStore';
import dataStore from '../stores/dataStore';
import createListStore from '../stores/createListStore';

const CoursesListStore = createListStore({
	name: 'COURSES',
	actions: {
		LOAD: ACTIONS.LOAD_COURSES,
		LOAD_MORE: ACTIONS.LOAD_MORE_COURSES,
	}
});

dispatcher.register(function (action) {
	CoursesListStore.dispatch(action);
});

const FavouritesListStore = createListStore({
	name: 'FAVOURITES',
	actions: {
		ADD: ACTIONS.ADD_TO_FAVOURITES,
		REMOVE: ACTIONS.REMOVE_FROM_FAVOURITES
	}
});

dispatcher.register(function (action) {
	FavouritesListStore.dispatch(action);
});

const CartListStore = createListStore({
	name: 'CART',
	actions: {
		ADD: ACTIONS.ADD_TO_CART,
		REMOVE: ACTIONS.REMOVE_FROM_CART
	}
});

dispatcher.register(function (action) {
	CartListStore.dispatch(action);
});

console.log(dispatch);

const AppStore = createStore({
	page: 1,
	courses_data: [],

	config: {},

	entities: {},

	courses: {
		map: [],
		list: [],
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

	revisions: {
		courses: {}
	}
}, function (action) {
	let payload = action.payload;
	let state = this.state;

	this.state.revisions = revisionStore.getState();
	this.state.config = configStore.getState();
	this.state.entities = dataStore.getState().entities;
	this.state.favourites.list = FavouritesListStore.getState().list.map((id) => this.state.entities.courses[id]);
	this.state.favourites.map = FavouritesListStore.getState().map;

	switch (action.type) {

		case ACTIONS.LOAD_COURSES:
			dispatcher.waitFor([dataStore.dispatchToken]);

			state.courses_data = payload;
			// state.courses.list = state.courses_data.slice(0, state.page * 3);
			// state.courses.map = this.state.entities.courses;

			state.courses.list = CoursesListStore.getState().paged_list.map((id) => this.state.entities.courses[id]);
			state.courses.map = CoursesListStore.getState().map;

			state.authors.map = this.state.entities.courses;

			state.authors.list = Object.keys(state.authors.map);

			this.emitChange();
			break;

		case ACTIONS.LOAD_MORE_COURSES:
			state.courses.list = CoursesListStore.getState().paged_list.map((id) => this.state.entities.courses[id]);
			this.emitChange();
			break;

		case ACTIONS.SAVE_COURSE:
			let id = course.id;
			if ('undefined' === typeof id) {
				id = course.id = new Date();
				state.courses_data.push(course);
				state.courses.map[id] = course;
				state.courses.list.unshift(course)
			} else {
				Object.assign(state.courses.map[id], course)
			}

			this.emitChange();
			break;

		case ACTIONS.ADD_TO_FAVOURITES:
		case ACTIONS.REMOVE_FROM_FAVOURITES:

			this.state.favourites.list = FavouritesListStore.getState().list.map((id) => this.state.entities.courses[id]);
			this.state.favourites.map = FavouritesListStore.getState().map;

			this.emitChange();
			break;

		case ACTIONS.ADD_TO_CART:
		case ACTIONS.REMOVE_FROM_CART:

			this.state.cart.list = CartListStore.getState().list.map((id) => this.state.entities.courses[id]);
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
