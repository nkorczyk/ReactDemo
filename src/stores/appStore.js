import createStore from './createStore';
import ACTIONS from '../constants/actions';
import { dispatcher } from '../appDispatcher';
import revisionStore from '../stores/revisionStore';
import configStore from '../stores/configStore';
import dataStore from '../stores/dataStore';

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

	switch (action.type) {

		case ACTIONS.LOAD_COURSES:
			dispatcher.waitFor([dataStore.dispatchToken]);

			state.courses_data = payload;
			state.courses.list = state.courses_data.slice(0, state.page * 3);

			state.courses.map = this.state.entities.courses;

			state.authors.map = this.state.entities.courses;

			state.authors.list = Object.keys(state.authors.map);

			this.emitChange();
			break;

		case ACTIONS.LOAD_MORE_COURSES:
			state.page = state.page + 1;
			state.courses.list = state.courses_data.slice(0, state.page * 3);
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

			var id = payload.id
			state.favourites.map[id] = true;
			state.favourites.list.push(state.courses.map[id])
			this.emitChange();
			break;

		case ACTIONS.REMOVE_FROM_FAVOURITES:

			var id = payload.id
			state.favourites.map[id] = false;
			var index = state.favourites.list.findIndex((c) => c.id === id)
			if (index !== -1)
				state.favourites.list.splice(index, 1)
			this.emitChange();
			break;

		case ACTIONS.ADD_TO_CART:

			var id = payload.id
			if (!state.cart.map[id]) {
				state.cart.map[id] = 1;
				state.cart.list.push(state.courses.map[id])
			} else {
				state.cart.map[id]++
			}
			this.emitChange();
			break;

		case ACTIONS.REMOVE_FROM_CART:

			var id = payload.id
			state.cart.map[id] === 0 ? 0 : state.cart.map[id]--;
			if (!state.cart.map[id]) {
				let index = state.cart.list.findIndex((c) => c.id === id)
				if (index !== -1)
					state.cart.list.splice(index, 1)
			}
			this.emitChange();
			break;
	}
})

AppStore.subscribe(function () {
	console.log(AppStore.getState())
})

console.log(AppStore)

export default AppStore;
