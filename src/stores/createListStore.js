import createStore from './createStore';

export default function createListStore(config) {

    let ACTIONS = {
        LOAD: 'LOAD_' + config.name,
        ADD: 'ADD_TO_' + config.name,
        REMOVE: 'REMOVE_FROM_' + config.name,
    }

    Object.assign(ACTIONS, config.actions);

    let store = createStore({
        list: [],
        map: {},
        page: 1,
        perpage: 3,
        paged_list: []
    }, function (action) {
        switch (action.type) {
            case ACTIONS.LOAD:
                this.state.list = action.payload.map((item) => item.id);
                this.state.map = this.state.list.reduce((map, item) => {
                    map[item.id] = true;
                    return map;
                }, {});

                this.state.paged_list = this.state.list.slice(0, this.state.page * this.state.perpage);

                this.emitChange();
                break;

            case ACTIONS.LOAD_MORE:
                this.state.page = this.state.page + 1;

                this.state.paged_list = this.state.list.slice(0, this.state.page * this.state.perpage);

                this.emitChange();
                break;

            case ACTIONS.ADD:
                var id = action.payload.id;

                if (!this.state.map[id]) {
                    this.state.list.push(id);
                    this.state.map[id] = true;
                }
                this.state.paged_list = this.state.list.slice(0, this.state.page * this.state.perpage);

                this.emitChange();
                break;

            case ACTIONS.REMOVE:
                var id = action.payload.id;

                if (this.state.map[id]) {
                    this.state.indexOf(id);
                    this.state.list.splice(index, 1);
                    delete this.state.map[id];
                }
                this.state.paged_list = this.state.list.slice(0, this.state.page * this.state.perpage);

                this.emitChange();
                break;
        }
    });

    return store;
};
