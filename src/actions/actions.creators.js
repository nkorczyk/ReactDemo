import ACTIONS from '../constants/actions';

const makeActionCreators = function (dispatch) {

    return {
        loadMore: function () {
            dispatch({
                type: ACTIONS.LOAD_MORE_COURSES,
                payload: {},
                meta: {
                    timestamp: Date.now()
                }
            })
        },
        saveCourse: function (course) {
            dispatch({
                type: ACTIONS.SAVE_COURSE,
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
                type: ACTIONS.ADD_TO_FAVOURITES,
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
                type: ACTIONS.REMOVE_FROM_FAVOURITES,
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
                type: ACTIONS.ADD_TO_CART,
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
                type: ACTIONS.REMOVE_FROM_CART,
                payload: {
                    id
                },
                meta: {
                    timestamp: Date.now()
                }
            })
        }
    }
}

export default makeActionCreators;
