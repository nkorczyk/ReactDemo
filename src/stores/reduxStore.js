import { createStore, combineReducers } from 'redux';


const initialState = {
    counter: 0
}

const counterReducer = (state = 0, action) => {

    switch (action.type) {
        case 'INCREMENT':
            return state + 1;

        case 'DECREMENT':
            return state - 1;

        default:
            return state;
    }
}

const listReducer = (state = [], action) => {

    switch (action.type) {
        case 'ADD':
            return [...state, 1];

        case 'REMOVE':
            return [...state.slice(0, state.length - 1)];

        default:
            return state;
    }
}

const rootReducer = (state = {}, action) => {

    switch (action.type) {
        default:
            return combineReducers({
                counter: counterReducer,
                list: listReducer
            })(state, action)
        // return {
        // 	...state,
        // 	counter: counterReducer(state.counter ,action),
        // 	list: listReducer(state.list ,action)
        // };
    }
}

const store = createStore(rootReducer, initialState)

export default store;
