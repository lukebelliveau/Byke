import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import Byke from './src/components/Byke';
import reducers from './src/redux/reducers';
import searchLocationSaga from './src/redux/searchPlacesSaga';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(sagaMiddleware)))
sagaMiddleware.run(searchLocationSaga);

const BykeApp = () =>
  <Provider store={store}>
    <Byke />
  </Provider>;

export default (App = () => <BykeApp />);
