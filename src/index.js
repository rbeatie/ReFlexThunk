import ReactDOM from "react-dom";
import thunk from 'redux-thunk'
import { Provider } from 'react-redux';
import App from './App';
import React from "react";
import {
  combineReducers,
  applyMiddleware,
  createStore,
  compose
} from 'redux'
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";
import "regenerator-runtime/runtime";
import * as Flex from "@twilio/flex-ui";

const mountNode = document.getElementById("root");

const defaultStoreState = {
  sandwiches: {
    isShopOpen: true,
    myMoney: 100
  }
};

const myReducer = (state = defaultStoreState, action) => {
  console.log('myReducer', state, action);

  return state;
};

const reducers = combineReducers({
  flex: Flex.FlexReducer,
  app: myReducer
});

const store = createStore(
    reducers,
    compose(
        applyMiddleware(thunk),
        Flex.applyFlexMiddleware()
    )
);

window.onload = () => {
  const predefinedConfig = window.appConfig || {};
  const configuration = {
    ...predefinedConfig,
  };

  Flex
    .progress(mountNode)
    .provideLoginInfo(configuration, mountNode)
    .then(() => Flex.Manager.create(configuration, store))
    .then(manager => renderApp(manager))
    .catch(error => handleError(error));
};

function renderApp(manager) {
  ReactDOM.render(
      <Provider
          store={store}
      >
       <App manager={manager} />
      </Provider>,
      mountNode
  );
}

function handleError(error) {
  console.error("Failed to initialize Flex", error);
}

registerServiceWorker();
