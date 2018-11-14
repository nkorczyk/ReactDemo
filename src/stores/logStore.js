import createStore from './createStore';


const  logStore = createStore({
	log: []
}, function(action) {
	
	this.state.log.push(action)
	this.emitChange()
})


export default logStore;