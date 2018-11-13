import createStore from './createStore';

const dataStore = createStore({
    entities: {
        courses: {},
        authors: {},
        categories: {}
    }
}, function (action) {
    let payload = action.payload;
    let state = this.state;

    switch (action.type) {
        case ACTIONS.LOAD_COURSES:

            payload.forEach(course => {
                this.state.entities.courses[course.id] = this.state.entities.courses[course.id] || course;

				this.state.entities.authors[course.author] = this.state.entities.authors[course.author] || course.author
            });

            this.emitChanges();
            break;

        case ACTIONS.LOAD_MORE_COURSES:
            this.emitChanges();
            break;
    }
});

export default dataStore;