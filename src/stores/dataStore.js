import createStore from './createStore';

import ACTIONS from '../constants/actions'


const  dataStore = createStore({
	entities:{
		courses:{},
		authors:{},
		categories:{}
	}

}, function(action) {
	let payload = action.payload;
	let state = this.state;

	switch(action.type){

		case ACTIONS.LOAD_COURSES:

			payload.forEach(course => {

				this.state.entities.courses[course.id] = this.state.entities.courses[course.id] || course;

				this.state.entities.authors[course.author] = this.state.entities.authors[course.author] || course.author

				course.categories.forEach(category => {
					this.state.entities.categories[category] = this.state.entities.categories[category] || category;
				})
			})

			this.emitChange();
			break;

		case ACTIONS.SAVE_COURSE:

			var course = payload.course;
			var id = course.id;

			//this.state.entities.courses[id] = course;
			this.state.entities.courses = { ...this.state.entities.courses, [id]: course };
			this.state.entities.authors[course.author] = course.author;

			course.categories.forEach(category => {
				this.state.entities.categories[category] = this.state.entities.categories[category] || category;
			})

			this.emitChange();
			break;
	}

})


export default dataStore;