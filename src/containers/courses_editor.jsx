import { CoursesEditor } from '../components/CoursesEditor';
import connect from '../connect';

export const CoursesEditorContainer = connect((state) => ({courses: state.courses_source}))(CoursesEditor);