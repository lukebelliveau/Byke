import reducer from '../../../src/redux/reducers';
import actions from '../../../src/redux/actions';
import testPlaces from '../../testLocations';
import { modes } from '../../../src/redux/reducers';

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

  const withStations = reducer(state, actions.stationsFetched(stations));

  expect(withStations).toMatchSnapshot();
});

test('PLACES_FETCHED puts places in state', () => {
  const places = testPlaces.results;
  const initialState = reducer();

  const withLocations = reducer(initialState, actions.placesFetched(places));

  expect(withLocations).toMatchSnapshot();
});

const trip = { latitude: 100, longitude: 100 };

test('TRIP_SET puts trip data into state', () => {
  let state = reducer();
  state = reducer(
    state,
    actions.locationUpdated({ latitude: 50, longitude: 50 })
  );
  state = reducer(
    state,
    actions.stationsFetched([
      { latitude: 25, longitude: 25 },
      { latitude: 75, longitude: 75 },
    ])
  );
  const withTrip = reducer(state, actions.tripSet(trip));

  expect(withTrip).toMatchSnapshot();
});

describe('BACK_BUTTON', () => {
  it('sets mode to overview when mode is search', () => {
    let state = reducer();
    state = {
      ...state,
      mode: modes.searchResults,
    };

    state = reducer(state, actions.backButton());

    expect(state).toMatchSnapshot();
  });

  it('sets mode to searc when mode is tripDisplay', () => {
    let state = reducer();
    state = {
      ...state,
      mode: modes.tripDisplay,
    };

    state = reducer(state, actions.backButton());

    expect(state).toMatchSnapshot();
  });
});

test('LOCATION_UPDATED updates location in state', () => {
  const location = { latitude: 10, longitude: 10 };
  const state = reducer();

  const withUpdatedLocation = reducer(state, actions.locationUpdated(location));

  expect(withUpdatedLocation).toMatchSnapshot();
});

test('LOCATION_UPDATED does not update region if not following user', () => {
  let state = reducer();
  state = {
    ...state,
    mode: modes.tripDisplay,
  };

  state = reducer(
    state,
    actions.locationUpdated({
      latitude: 97,
      longitude: 98,
    })
  );

  expect(state).toMatchSnapshot();
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
