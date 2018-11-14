import ACTIONS from '../constants/actions'
import store from '../stores/appStore';

const makeActionCreators = function(dispatch){
	return {
		loadMore: function(){
			dispatch({
				type: ACTIONS.LOAD_MORE_COURSES,
				payload:{},
				meta:{
					timestamp: Date.now()
				}
			})		
		},
		saveCourse: function(course){
			dispatch({
				type: ACTIONS.SAVE_COURSE,
				payload:{
					course
				},
				meta:{
					timestamp: Date.now()
				}
			})		
		},
		addFavourite: function(id){
			dispatch({
				type: ACTIONS.ADD_TO_FAVOURITES,
				payload:{
					id
				},
				meta:{
					timestamp: Date.now()
				}
			})		
		},
		removeFavourite: function(id){
			dispatch({
				type: ACTIONS.REMOVE_FROM_FAVOURITES,
				payload:{
					id
				},
				meta:{
					timestamp: Date.now()
				}
			})		
		},
		addToCart: function(id){
			dispatch({
				type: ACTIONS.ADD_TO_CART,
				payload:{
					id
				},
				meta:{
					timestamp: Date.now()
				}
			})		
		},
		removeFromCart: function(id){
			dispatch({
				type: ACTIONS.REMOVE_FROM_CART,
				payload:{
					id
				},
				meta:{
					timestamp: Date.now()
				}
			})		
		},

		searchCourses: function(query){
			let courses = store.getState().entities.courses;
			let courses_list = store.getState().courses.list.map(id => courses[id])
			let search_results = courses_list.filter((course) => (
				  course.title.toLowerCase().includes(query.toLowerCase()) 
				|| course.description.toLowerCase().includes(query.toLowerCase())
				|| course.author.toLowerCase().includes(query.toLowerCase())
			))

			dispatch({
				type: ACTIONS.LOAD_SEARCH_RESULTS, 
				payload: search_results,
				meta:{
					query
				}
			})
		},

		selectCourse: function(course){
			dispatch({
				type: ACTIONS.SELECT_IN_SEARCH_RESULTS, 
				payload: course
			})
		},

	}
}

export default makeActionCreators;