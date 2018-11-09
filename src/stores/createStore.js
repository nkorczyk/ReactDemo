import { EventEmitter } from 'events';

function createStore(initialState, actionsHandler, extraMethods) {

    const CHANGE_EVENT = 'change';

    const store = Object.assign({}, EventEmitter.prototype, {

        state: initialState || {},

        emitChange: function () {
            this.emit(CHANGE_EVENT)
        },

        subscribe: function (callback) {
            this.on(CHANGE_EVENT, callback)
        },

        removeChangeListener: function (callback) {
            this.removeListener(callback)
        },

        getState: function () {
            return this.state;
        },

        dispatch: function (action) {
            actionsHandler.call(this, action)
        }

    });
    return store;
}

export default createStore;