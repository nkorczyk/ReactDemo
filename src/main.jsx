// import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

import AppState from './AppState';
import actions from './actions';

import './style.css';
import './vendor/typeahead.bundle.css';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import {AppContainer} from './containers/App';
import Provider from './Provider';

ReactDOM.render(<Provider store={AppState} actions={actions} >
    <AppContainer />
</Provider>, document.getElementById('root'));