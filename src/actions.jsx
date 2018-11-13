import AppState from './AppState';

const actions = AppState.createActions({
	loadMore: function(event){
		var page = this.page + 1;

		this.page = page,
		this.courses.list = this.courses_source.slice(0, this.page * 3)
	},
	saveCourse: function(course){
		let id = course.id;
		if('undefined' === typeof id){
			id = course.id = new Date();
			this.courses_source.push(course);
			this.courses.map[id] = course;
			this.courses.list.unshift(course)
		}else{
			Object.assign(this.courses.map[id], course)
		}
	},
	addFavourite: function(id){
		this.favourites.map[id] = true;
		this.favourites.list.push(this.courses.map[id])
	},
	removeFavourite: function(id){
		this.favourites.map[id] = false;
		let index = this.favourites.list.findIndex((c)=>c.id === id)
		if(index !== -1)
		this.favourites.list.splice(index,1)
	},
	addToCart: function(id){
		if(!this.cart.map[id]){
			this.cart.map[id] = 1;
			this.cart.list.push(this.courses.map[id])
		}else{
			this.cart.map[id]++
		}
	},
	removeFromCart: function(id){
		this.cart.map[id] === 0? 0 : this.cart.map[id]--;
		if(!this.cart.map[id]){
			let index = this.cart.list.findIndex((c)=>c.id === id)
			if(index !== -1)
			this.cart.list.splice(index,1)
		}
	},
	navigateTo: function(tabName){
		this.activeTab = tabName
	}
})

export default actions;