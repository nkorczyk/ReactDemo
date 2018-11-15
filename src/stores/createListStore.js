import createStore from './createStore';

export default function createListStore(config) {

	let ACTIONS = {
		LOAD: 'LOAD_' + config.name,
		ADD: 'ADD_TO_' + config.name,
		REMOVE: 'REMOVE_FROM_' + config.name,
		SELECT: 'SELECT_IN_' + config.name,
	}
	Object.assign(ACTIONS, config.actions)

	let store = createStore({
		list: [],
		map: {},
		page: 1,
		perpage: 3,
		paged_list: [],
		selected: null,
	}, function (action) {

		switch (action.type) {

			case ACTIONS.SELECT:

				this.state.selected = action.payload;
				this.emitChange();
				break;


			case ACTIONS.LOAD:
				this.state.list = action.payload.map((item) => item.id);
				this.state.map = this.state.list.reduce((map, id) => {
					map[id] = true;
					return map;
				}, {})
				this.state.paged_list = this.state.list.slice(0, this.state.page * this.state.perpage)
				this.emitChange();
				break;


			case ACTIONS.LOAD_MORE:

				this.state.page = this.state.page + 1
				this.state.paged_list = this.state.list.slice(0, this.state.page * this.state.perpage)
				this.emitChange();
				break;

			case ACTIONS.ADD:
				var id = action.payload.id;

				if (!this.state.map[id]) {
					this.state.list = [...this.state.list, id];
					this.state.map = { ...this.state.map, [id]: true };
				}
				this.state.paged_list = this.state.list.slice(0, this.state.page * this.state.perpage)

				this.emitChange();
				break;

			case ACTIONS.REMOVE:

				var id = action.payload.id;
				if (this.state.map[id]) {
					let index = this.state.list.indexOf(id);
					this.state.list = [...this.state.list.slice(0, index), ...this.state.list.slice(index + 1, this.state.list.length)];
					this.state.map = { ...this.state.map, [id]: false };
				}
				this.state.paged_list = this.state.list.slice(0, this.state.page * this.state.perpage)

				this.emitChange();
				break;

		}
	})

	return store;
}
