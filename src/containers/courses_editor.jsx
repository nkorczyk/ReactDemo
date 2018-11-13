import connect from '../connect';
import {CoursesEditor} from '../components/CoursesEditor';

export const CoursesEditorContainer = connect(
	(state)=>({courses:state.courses_data}),
	(actions)=>({saveCourse: actions.saveCourse})
)(CoursesEditor)