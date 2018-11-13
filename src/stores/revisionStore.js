import createStore from './createStore';
import ACTIONS from '../constants/actions';

const logStore = createStore({
    courses: {}
}, function(action) {
    
	let payload = action.payload;
	let state = this.state;

	switch (action.type) { 
        case ACTIONS.SAVE_COURSE:
        let course = payload.course;
        this.state.courses[course.id] = this.state.courses[course.id] || [];
        this.state.courses[course.id].push({
            timstamp: Date.now(),
            revision: {...course, categories: [...course.categories]}
        });
        break;
    }
});

export default logStore;