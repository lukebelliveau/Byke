import reducer from '../../../src/redux/reducers';
import actions from '../../../src/redux/actions';

it('sets loading to true', () => {
  const state = reducer();

  const loading = reducer(state, actions.loadingStarted());

  expect(loading).toMatchSnapshot();
});

it('sets loading to false', () => {
  const state = reducer();

  const loading = reducer(state, actions.loadingStarted());

  expect(loading).toMatchSnapshot();
});