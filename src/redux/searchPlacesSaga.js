// @flow
import { call, put, takeEvery, takeLatest, select } from 'redux-saga/effects';
import api from '../api';
import actions, { types } from './actions';
import selectors from './selectors';

function* fetchPlaces(action) {
  const coordinates = yield select(selectors.getCoordinates);
  try {
    const places = yield call(
      api.searchPlaces,
      action.payload,
      coordinates.latitude,
      coordinates.longitude
    );
    yield put(actions.placesFetched(places.results));
  } catch (e) {
    yield put({ type: 'USER_FETCH_FAILED', message: e.message });
  }
}

function* searchPlacesSaga(): Generator<*, *, *> {
  yield takeLatest(types.SEARCH_PLACES, fetchPlaces);
}

export default searchPlacesSaga;
