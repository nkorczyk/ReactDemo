import StateStore from './StateStore';
import courses_data from './courses_data';

const AppState = new StateStore();


AppState.setState({
	page: 1,
	courses_source: courses_data,

	labels: {
		add_fav: "Dodaj do Ulubionych",
		remove_fav: "Usuń z Ulubionych",
	},

	courses_map: courses_data.reduce((map, course) => {
		map[course.id] = course;
		return map;
	},{}),
	courses_list: courses_data.slice(0,3),

	authors_map: courses_data.reduce((map, course)=>(
		(map[course.author] = course.author) && map
	),{}),

	favourites_list: [],
	favourites_map: {},

	cart_list: [],
	cart_map: {},

	activeTab: 'Kursy',
})

export default AppState