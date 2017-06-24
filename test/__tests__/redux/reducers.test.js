import reducer from '../../../src/redux/reducers';
import actions from '../../../src/redux/actions';

it('sets loading to true', () => {
  const state = reducer();

  const loading = reducer(state, actions.loadingStarted());

  expect(loading).toMatchSnapshot();
});

it('sets loading to false', () => {
  const state = reducer();

  const loading = reducer(state, actions.loadingFinished());

  expect(loading).toMatchSnapshot();
});

it('puts stations in state', () => {
  const stations = ['station1', 'station2'];
  const state = reducer();

  const withStations = reducer(state, actions.stationsFetched(stations));

  expect(withStations).toMatchSnapshot();
});

it('puts trip data into state', () => {
  const trip = { currentLocation: 'cur', destination: 'des' };
  const state = reducer();

  const withTrip = reducer(state, actions.tripSet(trip));

  expect(withTrip).toMatchSnapshot();
});
