const createListReducer = (config) => {
    let ACTIONS = {
        LOAD: 'LOAD_' + config.name,
        ADD: 'ADD_TO_' + config.name,
        REMOVE: 'REMOVE_FROM_' + config.name,
        SELECT: 'SELECT_IN_' + config.name,
    }

    Object.assign(ACTIONS, config.actions);

    const listReducer = (state = {
        list: [],
        map: {},
        page: 1,
        perpage: 3,
        paged_list: [],
        selected: null,
    }, action) => {
        switch (action.type) {
            case ACTIONS.LOAD:
                var ids_list = action.payload.map((item) => item.id);
                return {
                    ...state,
                    list: ids_list,
                    map: ids_list.reduce((map, id) => {
                        map[id] = true;
                        return map;
                    }, {}),
                    paged_list: ids_list.slice(0, state.page * state.perpage)
                };

            case ACTIONS.LOAD_MORE:
                var page = state.page + 1;
                return {
                    ...state,
                    page: page,
                    paged_list: state.list.slice(0, page * state.perpage)
                };

            case ACTIONS.ADD:
                var id = action.payload.id;
                var list = [...state.list, id];

                if (!state.map[id]) {
                    return {
                        ...state,
                        list: list,
                        map: { ...state.map, [id]: true },
                        paged_list: list.slice(0, state.page * state.perpage)
                    }
                }
                return state;

            case ACTIONS.REMOVE:
                var id = action.payload.id;
                
                if (state.map[id]) {
                    var index = state.list.indexOf(id);
                    var list = [...state.list.slice(0, index), ...state.list.slice(index + 1, state.list.length)];
                    return {
                        ...state,
                        list: list,
                        map: { ...state.map, [id]: false },
                        paged_list: list.slice(0, state.page * state.perpage)
                    }
                }
                return state;

            case ACTIONS.SELECT:
                return { ...state, selected: action.payload };

            default:
                return state;
        }
    }

    return listReducer;
}

export default createListReducer;
