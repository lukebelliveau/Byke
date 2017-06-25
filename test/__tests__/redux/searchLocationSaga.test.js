import SagaTester from 'redux-saga-tester';

import searchLocationSaga from '../../../src/redux/searchLocationSaga';
import reducer from '../../../src/redux/reducers';
import actions, { types } from '../../../src/redux/actions';
import locations from '../../testLocations';
import api from '../../../src/api';
import selectors from '../../../src/redux/selectors';

let state = reducer();
console.log(state);
state = reducer(state, actions.locationUpdated({ latitude: 0, longitude: 0 }));

let sagaTester;

beforeEach(() => {
  sagaTester = new SagaTester({ state });
  sagaTester.start(searchLocationSaga);
});

api.searchPlaces = jest.fn(() => ({ results: locations }));

selectors.getLatitude = jest.fn();
selectors.getLongitude = jest.fn();

it('sets locations on success', async () => {
  sagaTester.dispatch(actions.searchLocations('local place'));

  await sagaTester.waitFor(types.LOCATIONS_FETCHED);

  expect(sagaTester.getLastActionCalled()).toEqual(
    actions.locationsFetched(locations.results)
  );
});
