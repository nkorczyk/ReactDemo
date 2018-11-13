// import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

import './style.css';
import './vendor/typeahead.bundle.css';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import {AppContainer} from './containers/App';
import { CoursesListContainer, ShoppingCartListContainer, FavouritesCoursesListContainer } from './containers/courses_lists'
import { CoursesEditorContainer } from './containers/courses_editor';
import { CourseContainer } from './containers/CourseContainer';

const NotFound = () => <p className="text-center"> Nie znaleziono strony... </p>

import { Router, Route, IndexRoute, Redirect, IndexRedirect, browserHistory } from 'react-router';

import Provider from './Provider';
import {Layout} from './components/Layout'

import store from './stores/appStore';
import actionsCreators from './actions/actions.creators';

import courses_data from './courses_data';
import ACTIONS from './constants/actions';

import {dispatch, dispatcher} from './appDispatcher';

dispatcher.register(function(action) {
	store.dispatch(action);
});

import logStore from './stores/logStore';

dispatcher.register(function(action) {
	logStore.dispatch(action);
});


import revisions from './stores/revisionStore';

dispatcher.register(function(action) {
	revisions.dispatch(action);
});


dispatch({
	type: ACTIONS.LOAD_COURSES,
	payload: courses_data,
	meta: {
		timestamp: Date.now()
	}
})

// import AppState from './AppState';
// import actions from './actions';

ReactDOM.render(<Provider store={store} actions={actionsCreators(dispatch)}> 
        	
    	<Router history={browserHistory}>
    		<Route path="/" component={Layout}>
	    		<IndexRedirect to="kursy" />
	    		<Route path="kursy">
	    			<IndexRoute component={CoursesListContainer} />
	    			<Route path=":id" component={CourseContainer}/>
	    		</Route>
	    		<Route path="koszyk" component={ShoppingCartListContainer} />
	    		<Route path="ulubione" component={FavouritesCoursesListContainer} />
	    		<Route path="wyszukaj" component={CoursesEditorContainer} />
    			<Route path="*" component={NotFound} />
    		</Route>
    	</Router>

</Provider>, document.getElementById('root'));