import React from 'react';
import ReactDOM from 'react-dom';
//Componentes
import App from './App';
//Estilos
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
//Librerías
import 'bootstrap/dist/js/bootstrap.bundle';
//Service worker
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
