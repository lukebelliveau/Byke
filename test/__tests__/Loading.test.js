import React from 'react';
import renderer from 'react-test-renderer';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import Loading from '../../src/Loading';
import reducers from '../../src/redux/reducers';
import actions from '../../src/redux/actions';

it('displays loading message when loading', () => {
  const store = createStore(reducers);
  store.dispatch(actions.loadingStarted());
  const byke = renderer.create(<Provider store={store}><Loading /></Provider>);

  expect(byke).toMatchSnapshot();
});

it('returns nothing when nothing is loading', () => {
  const store = createStore(reducers);
  store.dispatch(actions.loadingFinished());
  const byke = renderer.create(<Provider store={store}><Loading /></Provider>);

  expect(byke).toMatchSnapshot();
});
