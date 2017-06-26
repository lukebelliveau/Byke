// @flow
import { Location, Trip, Place, Station } from '../Types';
export const types = {
  LOADING_FINISHED: 'LOADING_FINISHED',
  LOADING_STARTED: 'LOADING_STARTED',
  STATIONS_FETCHED: 'STATIONS_FETCHED',
  PLACES_FETCHED: 'PLACES_FETCHED',
  TRIP_SET: 'TRIP_SET',
  LOCATION_UPDATED: 'LOCATION_UPDATED',
  SEARCH_PLACES: 'SEARCH_PLACES',
  CHANGE_SEARCH_TEXT: 'CHANGE_SEARCH_TEXT',
};

const searchPlaces = (searchQuery: string) => ({
  type: types.SEARCH_PLACES,
  payload: searchQuery,
});

const loadingStarted = () => ({
  type: types.LOADING_STARTED,
});

const loadingFinished = () => ({
  type: types.LOADING_FINISHED,
});

const stationsFetched = (stations: Array<Station>) => ({
  type: types.STATIONS_FETCHED,
  payload: stations,
});

const placesFetched = (places: Array<Place>) => ({
  type: types.PLACES_FETCHED,
  payload: places,
});

const tripSet = (trip: Location) => ({
  type: types.TRIP_SET,
  payload: trip,
});

const locationUpdated = (location: Location) => ({
  type: types.LOCATION_UPDATED,
  payload: location,
});

const changeSearchText = (text: string) => ({
  type: types.CHANGE_SEARCH_TEXT,
  payload: text,
});

export default {
  loadingStarted,
  loadingFinished,
  stationsFetched,
  placesFetched,
  tripSet,
  locationUpdated,
  searchPlaces,
  changeSearchText,
};
