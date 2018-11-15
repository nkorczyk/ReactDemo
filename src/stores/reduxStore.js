import { createStore, combineReducers } from 'redux';
import ACTIONS from '../constants/actions';
import createListReducer from './createListReducer';

import DevTools from '../DevTools';

const initialState = {

}

const entitiesReducer = (state = {
    courses: {}
}, action) => {

    switch (action.type) {
        case ACTIONS.LOAD_COURSES:
            let courses = action.payload.reduce((map, course) => {
                map[course.id] = course;
                return map;
            }, {});
            let authors = action.payload.reduce((map, course) => {
                map[course.authorId] = course.author;
                return map;
            }, {});
            return {
                ...state,
                courses,
                authors
            };

        case ACTIONS.SAVE_COURSE:

            var course = payload.course;
            var id = course.id;

            return {
                ...state,
                courses: { ...state.courses, [id]: course }
            };

        default:
            return state;
    }
}

const loadingReducer = (state = false, action) => {
    switch (action.type) {
        case ACTIONS.START_LOADING:
            return true;
        case ACTIONS.STOP_LOADING:
            return false;
        default:
            return state;
    }
}

const configReducer = (state = {
    labels: {
        add_fav: "Dodaj do Ulubionych",
        remove_fav: "Usuń z Ulubionych",
    }
}, action) => {
    return state;
}

const rootReducer = combineReducers({
    entities: entitiesReducer,
    isLoading: loadingReducer,
    config: configReducer,

    courses: createListReducer({
        name: 'COURSES',
        actions: {
            LOAD: ACTIONS.LOAD_COURSES,
            LOAD_MORE: ACTIONS.LOAD_MORE_COURSES
        }
    }),

    authors: createListReducer({
        name: 'AUTHORS',
        actions: {
            LOAD: ACTIONS.LOAD_FAVOURITES,
            ADD: ACTIONS.ADD_TO_FAVOURITES,
            REMOVE: ACTIONS.REMOVE_FROM_FAVOURITES
        }
    }),

    favourites: createListReducer({
        name: 'FAVOURITES',
        actions: {}
    }),

    cart: createListReducer({
        name: 'CART',
        actions: {
            LOAD: ACTIONS.LOAD_CART,
            ADD: ACTIONS.ADD_TO_CART,
            REMOVE: ACTIONS.REMOVE_FROM_CART
        }
    }),

    search_results: createListReducer({
        name: 'SEARCH_RESULTS',
        actions: {
            LOAD: ACTIONS.LOAD_SEARCH_RESULTS,
            LOAD_MORE: 'LOAD_MORE_SEARCH_RESULTS',
            SELECT: ACTIONS.SELECT_IN_SEARCH_RESULTS
        }
    }),
});

const store = createStore(rootReducer, initialState, DevTools.instrument());

export default store;
