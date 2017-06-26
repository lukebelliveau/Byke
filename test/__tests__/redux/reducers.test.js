import reducer from '../../../src/redux/reducers';
import actions from '../../../src/redux/actions';
import testLocations from '../../testLocations';

test('LOADING_STARTED sets loading to true', () => {
  const state = reducer();

  const loading = reducer(state, actions.loadingStarted());

  expect(loading).toMatchSnapshot();
});

test('LOADING_FINISHED sets loading to false', () => {
  const state = reducer();

  const loading = reducer(state, actions.loadingFinished());

  expect(loading).toMatchSnapshot();
});

test('STATIONS_FETCHED puts stations in state', () => {
  const stations = ['station1', 'station2'];
  const state = reducer();

  const action = actions.stationsFetched(stations);
  const withStations = reducer(state, actions.stationsFetched(stations));

  expect(withStations).toMatchSnapshot();
});

test('PLACES_FETCHED puts locations in state', () => {
  const locations = testLocations.results;
  const initialState = reducer();

  const withLocations = reducer(
    initialState,
    actions.locationsFetched(locations)
  );

  expect(withLocations).toMatchSnapshot();
});

test('TRIP_SET puts trip data into state', () => {
  const trip = { currentLocation: 'cur', destination: 'des' };
  const state = reducer();

  const withTrip = reducer(state, actions.tripSet(trip));

  expect(withTrip).toMatchSnapshot();
});

test('LOCATION_UPDATED updates location in state', () => {
  const location = { latitude: 10, longitude: 10 };
  const state = reducer();

  const withUpdatedLocation = reducer(state, actions.locationUpdated(location));

  expect(withUpdatedLocation).toMatchSnapshot();
});

test('CHANGED SEARCH_TEXT changes searchText in state', () => {
  const text = 'a query';
  const state = reducer();

  const withSearchText = reducer(state, actions.changeSearchText(text));

  expect(withSearchText).toMatchSnapshot();
});

it('handles improper actions', () => {
  const initialState = reducer();

  const stateAfterAction = reducer(initialState, 'an invalid action');

  expect(initialState).toEqual(stateAfterAction);
});
