import appStore from '../stores/appStore';

const dispatch = appStore.dispatch.bind(appStore);

const actioCreators = {
    loadMore: function () {
        dispatch({
            type: 'LOAD_MORE_COURSES',
            payload: {},
            meta: {
                timestamp: Date.now()
            }
        })
    },
    saveCourse: function (course) {
        dispatch({
            type: 'SAVE_COURSE',
            payload: {
                course
            },
            meta: {
                timestamp: Date.now()
            }
        })
    },
    addFavourite: function (id) {
        dispatch({
            type: 'ADD_TO_FAVOURITES',
            payload: {
                id
            },
            meta: {
                timestamp: Date.now()
            }
        })
    },
    removeFavourite: function (id) {
        dispatch({
            type: 'REMOVE_FROM_FAVOURITES',
            payload: {
                id
            },
            meta: {
                timestamp: Date.now()
            }
        })
    },
    addToCart: function (id) {
        dispatch({
            type: 'ADD_TO_CART',
            payload: {
                id
            },
            meta: {
                timestamp: Date.now()
            }
        })
    },
    removeFromCart: function (id) {
        dispatch({
            type: 'REMOVE_FROM_CART',
            payload: {
                id
            },
            meta: {
                timestamp: Date.now()
            }
        })
    }
}
