import { call, put, takeEvery, takeLatest, select } from 'redux-saga/effects';
import api from '../api';
import actions, { types } from './actions';
import selectors from './selectors';

function* fetchLocations(action) {
  const latitude = yield select(selectors.getLatitude);
  const longitude = yield select(selectors.getLongitude);
  try {
    const locations = yield call(
      api.searchPlaces,
      action.payload,
      latitude,
      longitude
    );
    yield put(actions.locationsFetched(locations.results));
  } catch (e) {
    yield put({ type: 'USER_FETCH_FAILED', message: e.message });
  }
}

function* searchLocationSaga() {
  yield takeLatest('SEARCH_LOCATIONS', fetchLocations);
}

export default searchLocationSaga;
