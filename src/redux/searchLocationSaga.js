// @flow
import { call, put, takeEvery, takeLatest, select } from 'redux-saga/effects';
import api from '../api';
import actions, { types } from './actions';
import selectors from './selectors';

function* fetchLocations(action) {
  const coordinates = yield select(selectors.getCoordinates);
  try {
    const locations = yield call(
      api.searchPlaces,
      action.payload,
      coordinates.latitude,
      coordinates.longitude
    );
    yield put(actions.locationsFetched(locations.results));
  } catch (e) {
    yield put({ type: 'USER_FETCH_FAILED', message: e.message });
  }
}

function* searchLocationSaga(): Generator<*, *, *> {
  yield takeLatest('SEARCH_LOCATIONS', fetchLocations);
}

export default searchLocationSaga;
