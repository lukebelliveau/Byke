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

export const modes = {
  overview: 'OVERVIEW',
  searchResults: 'SEARCH',
  tripDisplay: 'TRIP_DISPLAY',
};

const initialState = {
  isLoading: false,
  currentLocation: {
    latitude: 0,
    longitude: 0,
  },
  stations: [],
  mode: modes.overview,
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
        mode: { $set: modes.searchResults },
      });
    case types.TRIP_SET:
      const region = utils.computeRegionThatFitsAllPoints([
        action.payload,
        state.region,
      ]);
      return update(state, {
        trip: {
          $set: {
            destination: action.payload,
            closeToLocation: [
              utils.findClosestStation(
                state.currentLocation,
                state.stations
              )[0],
            ],
            closeToDestination: [
              utils.findClosestStation(action.payload, state.stations)[0],
            ],
          },
        },
        mode: { $set: modes.tripDisplay },
        region: { $set: region },
      });
    case types.LOCATION_UPDATED:
      return update(state, {
        currentLocation: { $set: action.payload },
        region: {
          $set: {
            latitude: state.mode === modes.overview
              ? action.payload.latitude
              : state.region.latitude,
            longitude: state.mode === modes.overview
              ? action.payload.longitude
              : state.region.latitude,
            latitudeDelta: state.region.latitudeDelta,
            longitudeDelta: state.region.longitudeDelta,
          },
        },
      });
    case types.EXIT_TRIP:
      return update(state, {
        mode: { $set: modes.searchResults },
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
