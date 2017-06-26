import SagaTester from 'redux-saga-tester';
import { select } from 'redux-saga';

import searchLocationSaga from '../../../src/redux/searchPlacesSaga';
import reducer from '../../../src/redux/reducers';
import actions, { types } from '../../../src/redux/actions';
import places from '../../testLocations';
import api from '../../../src/api';
import selectors from '../../../src/redux/selectors';

let state = reducer();

let sagaTester;

beforeEach(() => {
  sagaTester = new SagaTester({ state });
  sagaTester.start(searchLocationSaga);
});

api.searchPlaces = jest.fn(() => ({ results: places.results }));
selectors.getCoordinates = jest.fn(() => ({ latitude: 50, longitude: 50 }));

it('sets places on success', async () => {
  sagaTester.dispatch(actions.searchPlaces('local place'));

  await sagaTester.waitFor(types.PLACES_FETCHED);

  expect(sagaTester.getLatestCalledAction()).toEqual(
    actions.placesFetched(places.results)
  );
});
