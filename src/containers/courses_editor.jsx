import connect from '../connect';
import {CoursesEditor} from '../components/CoursesEditor';
import projector from './projector';

const getSearchResultsList = projector([
	state => state.search_results.list,
	state => state.entities.courses
],(list, entities)=>(
	list.map(id => entities[id])
))

export const CoursesEditorContainer = connect(
	(state)=>({
		results: getSearchResultsList(state), 
		selected: state.search_results.selected, 
		revisions: state.revisions.courses 
	}),
	(actions)=>({
		saveCourse: actions.saveCourse, 
		search: actions.searchCourses, 
		select: actions.selectCourse 
	})
)(CoursesEditor)