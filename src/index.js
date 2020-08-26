import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
//Redux store
import store from './redux/store';
//Components
import App from './App';
//Styles
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
//Libraries
import 'bootstrap/dist/js/bootstrap.bundle';
//Service worker
import * as serviceWorker from './serviceWorker';


let WithStore = <Provider store = { store }><App /></Provider>

ReactDOM.render(WithStore, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
