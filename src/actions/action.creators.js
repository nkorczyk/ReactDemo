import ACTIONS from '../constants/actions'
import store from '../stores/appStore';
import axios from 'axios';

const makeActionCreators = function (dispatch) {
	return {
		fetchCourses: function () {
			dispatch({
				type: ACTIONS.START_LOADING,
			})

			axios.get('http://localhost:3000/courses?_expand=author')
				.then(response => {
					let courses_data = response.data;

					dispatch({
						type: ACTIONS.LOAD_COURSES,
						payload: courses_data,
						meta: {
							timestamp: Date.now()
						}
					})

					dispatch({
						type: ACTIONS.STOP_LOADING,
					})
				})
		},
		fetchFavourites: function () {
			dispatch({
				type: ACTIONS.START_LOADING,
			})

			axios.get('http://localhost:3000/favourites')
				.then(response => {
					let courses_data = response.data;

					dispatch({
						type: ACTIONS.LOAD_FAVOURITES,
						payload: courses_data,
						meta: {
							timestamp: Date.now()
						}
					})

					dispatch({
						type: ACTIONS.STOP_LOADING,
					})
				})
		},
		fetchCart: function () {
			dispatch({
				type: ACTIONS.START_LOADING,
			})

			axios.get('http://localhost:3000/shopping_cart')
				.then(response => {
					let courses_data = response.data;

					dispatch({
						type: ACTIONS.LOAD_CART,
						payload: courses_data,
						meta: {
							timestamp: Date.now()
						}
					})

					dispatch({
						type: ACTIONS.STOP_LOADING,
					})
				})
		},
		loadMore: function () {
			dispatch({
				type: ACTIONS.LOAD_MORE_COURSES,
				payload: {},
				meta: {
					timestamp: Date.now()
				}
			})
		},
		saveCourse: function (course) {
			dispatch({
				type: ACTIONS.START_LOADING,
			})

			course.authotId = course.author.id;

			axios.post('http://localhost:3000/courses?_expand=author', course)
				.then(response => {
					let course = response.data;
					dispatch({
						type: ACTIONS.SAVE_COURSE,
						payload: {
							course
						},
						meta: {
							timestamp: Date.now()
						}
					})
				});
			dispatch({
				type: ACTIONS.STOP_LOADING,
			});
		},
		addFavourite: function (id) {
			dispatch({
				type: ACTIONS.START_LOADING,
			})

			let favourite = {
				id: id,
				courseId: id
			};

			axios.post('http://localhost:3000/favourites', favourite)
				.then(response => {
					let favourite = response.data;

					dispatch({
						type: ACTIONS.ADD_TO_FAVOURITES,
						payload: {
							id: favourite.courseId
						},
						meta: {
							timestamp: Date.now()
						}
					})
				});

			dispatch({
				type: ACTIONS.STOP_LOADING,
			});
		},
		removeFavourite: function (id) {
			dispatch({
				type: ACTIONS.START_LOADING,
			})

			let favourite = {
				id: id,
				courseId: id
			};

			axios.delete('http://localhost:3000/favourites/' + favourite.id)
				.then(response => {

					dispatch({
						type: ACTIONS.REMOVE_FROM_FAVOURITES,
						payload: {
							id: id
						},
						meta: {
							timestamp: Date.now()
						}
					})
				});

			dispatch({
				type: ACTIONS.STOP_LOADING,
			});
		},
		addToCart: function (id) {
			dispatch({
				type: ACTIONS.START_LOADING,
			})

			let cart = {
				id: id,
				courseId: id
			};

			axios.post('http://localhost:3000/shopping_cart', cart)
				.then(response => {
					let cart = response.data;

					dispatch({
						type: ACTIONS.ADD_TO_FAVOURITES,
						payload: {
							id: favourite.courseId
						},
						meta: {
							timestamp: Date.now()
						}
					})
				});

			dispatch({
				type: ACTIONS.STOP_LOADING,
			});
		},
		removeFromCart: function (id) {
			dispatch({
				type: ACTIONS.START_LOADING,
			})

			let cart = {
				id: id,
				courseId: id
			};

			axios.delete('http://localhost:3000/shopping_cart/' + cart.id)
				.then(response => {

					dispatch({
						type: ACTIONS.REMOVE_FROM_FAVOURITES,
						payload: {
							id: id
						},
						meta: {
							timestamp: Date.now()
						}
					})
				});

			dispatch({
				type: ACTIONS.STOP_LOADING,
			});



			dispatch({
				type: ACTIONS.REMOVE_FROM_CART,
				payload: {
					id
				},
				meta: {
					timestamp: Date.now()
				}
			})
		},

		searchCourses: function (query) {
			// let courses = store.getState().entities.courses;
			// let courses_list = store.getState().courses.list.map(id => courses[id])
			// let search_results = courses_list.filter((course) => (
			// 	course.title.toLowerCase().includes(query.toLowerCase())
			// 	|| course.description.toLowerCase().includes(query.toLowerCase())
			// 	|| course.author.name.toLowerCase().includes(query.toLowerCase())
			// ))
			dispatch({
				type: ACTIONS.START_LOADING,
			})

			axios.get('http://localhost:3000/courses?_expand=author&q=' + query)
				.then(response => {
					let search_results = response.data;
					dispatch({
						type: ACTIONS.LOAD_SEARCH_RESULTS,
						payload: search_results,
						meta: {
							query
						}
					})

					dispatch({
						type: ACTIONS.STOP_LOADING,
					})

				})
		},

		selectCourse: function (course) {
			dispatch({
				type: ACTIONS.SELECT_IN_SEARCH_RESULTS,
				payload: course
			})
		},

	}
}

export default makeActionCreators;
