// import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

import AppState from './AppState';
import actions from './actions';

import './style.css';
import './vendor/typeahead.bundle.css';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import App from './components/App';

ReactDOM.render(<App store={AppState} actions={actions} />, document.getElementById('root'));