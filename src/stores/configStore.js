import createStore from './createStore';

const configStore = createStore({
    labels: {
		add_fav: "Dodaj do Ulubionych",
		remove_fav: "Usuń z Ulubionych",
	}
}, function (action) {

});

export default configStore;