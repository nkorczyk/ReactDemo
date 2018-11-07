import AppState from './AppState';

const actions = AppState.createActions({
	loadMore: function(event){
		var page = this.page + 1;

		this.page = page,
		this.courses_list = this.courses_source.slice(0, this.page * 3)
	},
	saveCourse: function(course){
		let id = course.id;
		if('undefined' === typeof id){
			id = course.id = new Date();
			this.courses_source.push(course);
			this.courses_map[id] = course;
			this.courses_list.unshift(course)
		}else{
			Object.assign(this.courses_map[id], course)
		}
	},
	addFavourite: function(id){
		this.favourites_map[id] = true;
		this.favourites_list.push(this.courses_map[id])
	},
	removeFavourite: function(id){
		this.favourites_map[id] = false;
		let index = this.favourites_list.findIndex((c)=>c.id === id)
		if(index !== -1)
		this.favourites_list.splice(index,1)
	},
	addToCart: function(id){
		if(!this.cart_map[id]){
			this.cart_map[id] = 1;
			this.cart_list.push(this.courses_map[id])
		}else{
			this.cart_map[id]++
		}
	},
	removeFromCart: function(id){
		this.cart_map[id] === 0? 0 : this.cart_map[id]--;
		if(!this.cart_map[id]){
			let index = this.cart_list.findIndex((c)=>c.id === id)
			if(index !== -1)
			this.cart_list.splice(index,1)
		}
	},
	navigateTo: function(tabName){
		console.log('tabName',tabName, this)
		this.activeTab = tabName
	}
})


export default actions