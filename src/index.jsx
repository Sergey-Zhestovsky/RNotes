import React from 'react';
import ReactDOM from 'react-dom';
import "normalize.css";
import './css/index.css';
import './css/fonts.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./storage/reducers/rootReducer";
import thunk from "redux-thunk";
import rootConnector from "./storage/connection/rootConnector";

let store = createStore(
  rootReducer,
  applyMiddleware(thunk.withExtraArgument(rootConnector))
);

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.getElementById('root')
);
serviceWorker.unregister();