import connect from '../connect';

import {Course, CourseDetails} from '../components/Course'

export const CourseContainer = connect(
	({courses}) =>  ({courses_map: courses.map}),
	(actions) => actions,
	(state,actions,props) => {
		let id = parseInt(props.routeParams.id);
		return { data: state.courses_map[ id], Details: props.route['course-details'] || CourseDetails }
	}
)(Course)