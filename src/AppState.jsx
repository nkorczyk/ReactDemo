import StateStore from './StateStore';

const AppState = new StateStore();

import courses_data from './courses_data';

let courses_map = courses_data.reduce((map, course) => {
	map[course.id] = course;
	return map;
},{})

let authors_map = courses_data.reduce((map, course)=>(
	(map[course.author] = course.author) && map
),{})

let authors_list = Object.keys(authors_map);

AppState.setState({
	page: 1,
	courses_source: courses_data,
	courses_data: courses_data,

	labels:{
		add_fav: "Dodaj do Ulubionych",
		remove_fav: "Usuń z Ulubionych",
	},

	courses:{
		map: courses_map,
		list: courses_data.slice(0,3),
	},

	authors:{
		map: authors_map,
		list: authors_list,	
	},

	favourites:{
		map:{},
		list:[]
	},

	cart:{
		map:{},
		list:[]
	}
})

export default AppState