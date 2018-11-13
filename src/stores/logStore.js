import createStore from './createStore';

const logStore = createStore({
    log: []
}, function (action) {
    this.state.log.push(action);
    this.emitChange();
});

console.log(logStore);

export default logStore;