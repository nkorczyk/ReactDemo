// import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

import AppState from './AppState';
import actions from './actions';

import './style.css';
import './vendor/typeahead.bundle.css';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import { AppContainer } from './containers/App';
import Provider from './Provider';

import { Router, Route, IndexRoute, Redirect, IndexRedirect, hashHistory } from 'react-router';
import { CoursesListContainer, ShoppingCartListContainer, FavouritesCoursesListContainer } from './containers/courses_list';
import { CoursesEditorContainer } from './containers/courses_editor';

import { Layout } from './components/Layout';

const NotFound = () => <p className="text-center">Nie znaleziono strony</p>

ReactDOM.render(<Provider store={AppState} actions={actions} >
    <Router history={hashHistory}>
        <Route path="/" component={Layout}>
            <IndexRedirect to="kursy" />
            <Route path="kursy" component={CoursesListContainer} />
            <Route path="koszyk" component={ShoppingCartListContainer} />
            <Route path="ulubione" component={FavouritesCoursesListContainer} />
            <Route path="wyszukaj" component={CoursesEditorContainer} />
            {/* <Redirect from="/" to="kursy" /> */}
            <Route path="*" component={NotFound} />
        </Route>
    </Router>
</Provider>, document.getElementById('root'));
