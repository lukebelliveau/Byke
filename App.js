import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import Byke from './src/Byke';
import reducers from './src/redux/reducers';

let store = createStore(reducers);

const BykeApp = () =>
  <Provider store={store}>
    <Byke />
  </Provider>;

export default (App = () => <BykeApp />);
