// @flow
import update from 'immutability-helper';

import { types } from './actions';
import utils from '../utils';
import { Region, Location, Trip, State } from '../Types';

type Place = {
  id: number,
  name: string,
  vicinity: string,
  geometry: {
    location: {
      lat: number,
      lng: number,
    },
  },
};

const initialState = {
  isLoading: false,
  stations: [],
  trip: null,
  places: [],
  region: {
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  },
  searchText: '',
};

const reducer = (
  state: State = initialState,
  action: { type: string, payload: Object } = { type: 'invalid', payload: {} }
) => {
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
        isLoading: { $set: false },
      });
    case types.SEARCH_PLACES:
      return update(state, {
        isLoading: { $set: true },
      });
    case types.PLACES_FETCHED:
      return update(state, {
        places: { $set: action.payload },
        trip: { $set: null },
        isLoading: { $set: false },
      });
    case types.TRIP_SET:
      const region = utils.computeRegionThatFitsAllPoints([action.payload, state.region]);
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
    case types.CHANGE_SEARCH_TEXT:
      return update(state, {
        searchText: { $set: action.payload },
      });
    default:
      return state;
  }
};

export default reducer;
