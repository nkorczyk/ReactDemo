import createStore from './createStore';

const AppStore = createStore({
    page: 1,
    courses_data: [],

    labels: {
        add_fav: "Dodaj do Ulubionych",
        remove_fav: "Usuń z Ulubionych",
    },

    courses: {
        map: [],
        list: [],
    },

    authors: {
        map: [],
        list: [],
    },

    favourites: {
        map: {},
        list: []
    },

    cart: {
        map: {},
        list: []
    }
}, function (action) {
    let payload = action.payload;
    let state = this.state;

    switch (action.type) {

        case 'LOAD_COURSES':

            state.courses_data = payload;
            state.courses.list = payload;

            state.courses_map = payload.reduce((map, course) => {
                map[course.id] = course;
                return map;
            }, {})

            state.authors_map = payload.reduce((map, course) => (
                (map[course.author] = course.author) && map
            ), {})

            state.authors_list = Object.keys(state.authors_map);

            this.emitChange();
            break;

        case 'LOAD_MORE_COURSES':
            this.emitChange();
            break;

        case 'SAVE_COURSE':
            this.emitChange();
            break;

        case 'ADD_TO_FAVOURITES':
            this.emitChange();
            break;

        case 'REMOVE_FROM_FAVOURITES':
            this.emitChange();
            break;

        case 'ADD_TO_CART':
            this.emitChange();
            break;

        case 'REMOVE_FROM_CART':
            this.emitChange();
            break;

    }

})


import courses_data from '../courses_data';

AppStore.subscribe(function () {
    console.log(AppStore.getState())
})

AppStore.dispatch({
    type: 'LOAD_COURSES',
    payload: courses_data,
    meta: {
        timestamp: Date.now()
    }
})

console.log(AppStore)