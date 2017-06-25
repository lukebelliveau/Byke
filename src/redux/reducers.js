import update from 'immutability-helper';
import { types } from './actions';
import computeRegion from '../utils';

const initialState = {
  isLoading: false,
  stations: [],
  trip: null,
  locations: [],
  region: {
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  },
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.LOADING_STARTED:
      return update(state, {
        isLoading: { $set: true },
      });
    case types.LOADING_FINISHED:
      return update(state, {
        isLoading: { $set: false },
      });
    case types.STATIONS_FETCHED:
      return update(state, {
        stations: { $set: action.payload },
        isLoading: { $set: false }
      });
    case types.SEARCH_LOCATIONS:
      return update(state, {
        isLoading: { $set: true }
      })
    case types.LOCATIONS_FETCHED:
      return update(state, {
        locations: { $set: action.payload },
        trip: { $set: null },
        isLoading: { $set: false },
      });
    case types.TRIP_SET:
      const region = computeRegion([action.payload, state.region]);
      return update(state, {
        trip: {
          $set: {
            currentLocation: state.region,
            destination: action.payload,
          },
        },
        region: { $set: region },
        location: { $set: [] },
      });
    case types.LOCATION_UPDATED:
      return update(state, {
        region: {
          latitude: { $set: action.payload.latitude },
          longitude: { $set: action.payload.longitude },
        },
      });
    default:
      return state;
  }
};

export default reducer;
