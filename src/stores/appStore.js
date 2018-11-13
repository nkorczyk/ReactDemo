import createStore from './createStore';

const AppStore = createStore({
	page: 1,
	courses_data: [],

	labels:{
		add_fav: "Dodaj do Ulubionych",
		remove_fav: "Usuń z Ulubionych",
	},

	courses:{
		map: [],
		list: [],
	},

	authors:{
		map: [],
		list: [],	
	},

	favourites:{
		map:{},
		list:[]
	},

	cart:{
		map:{},
		list:[]
	}
}, function(action){
	let payload = action.payload;
	let state = this.state;

	switch(action.type){

		case 'LOAD_COURSES':

			state.courses_data = payload;
			state.courses.list = payload;

			state.courses_map = payload.reduce((map, course) => {
				map[course.id] = course;
				return map;
			},{})

			state.authors_map = payload.reduce((map, course)=>(
				(map[course.author] = course.author) && map
			),{})

			state.authors_list = Object.keys(state.authors_map);

			this.emitChange();
			break;

		case 'LOAD_MORE_COURSES':

			this.emitChange();
			break;

		case 'SAVE_COURSE':
			let id = course.id;
			if('undefined' === typeof id){
				id = course.id = new Date();
				state.courses_data.push(course);
				state.courses.map[id] = course;
				state.courses.list.unshift(course)
			}else{
				Object.assign(state.courses.map[id], course)
			}

			this.emitChange();
			break;

		case 'ADD_TO_FAVOURITES':

			var id = payload.id
			state.favourites.map[id] = true;
			state.favourites.list.push(state.courses.map[id])
			this.emitChange();
			break;

		case 'REMOVE_FROM_FAVOURITES':

			var id = payload.id
			state.favourites.map[id] = false;
			var index = state.favourites.list.findIndex((c)=>c.id === id)
			if(index !== -1)
			state.favourites.list.splice(index,1)
			this.emitChange();
			break;

		case 'ADD_TO_CART':

			var id = payload.id
			if(!state.cart.map[id]){
				state.cart.map[id] = 1;
				state.cart.list.push(state.courses.map[id])
			}else{
				state.cart.map[id]++
			}
			this.emitChange();
			break;

		case 'REMOVE_FROM_CART':

			var id = payload.id
			state.cart.map[id] === 0? 0 : state.cart.map[id]--;
			if(!state.cart.map[id]){
				let index = state.cart.list.findIndex((c)=>c.id === id)
				if(index !== -1)
				state.cart.list.splice(index,1)
			}
			this.emitChange();
			break;

	}

})


import courses_data from '../courses_data';

AppStore.subscribe(function(){
	console.log(AppStore.getState())
})

AppStore.dispatch({
	type:'LOAD_COURSES',
	payload: courses_data,
	meta:{
		timestamp: Date.now()
	}
})

console.log(AppStore)