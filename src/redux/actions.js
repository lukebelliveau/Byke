// @flow
import { Location, Trip, Place, Station } from '../Types';
export const types = {
  LOADING_FINISHED: 'LOADING_FINISHED',
  LOADING_STARTED: 'LOADING_STARTED',
  STATIONS_FETCHED: 'STATIONS_FETCHED',
  LOCATIONS_FETCHED: 'LOCATIONS_FETCHED',
  TRIP_SET: 'TRIP_SET',
  LOCATION_UPDATED: 'LOCATION_UPDATED',
  SEARCH_LOCATIONS: 'SEARCH_LOCATIONS',
  CHANGE_SEARCH_TEXT: 'CHANGE_SEARCH_TEXT',
};

const searchLocations = (searchQuery: string) => ({
  type: types.SEARCH_LOCATIONS,
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

const locationsFetched = (locations: Array<Place>) => ({
  type: types.LOCATIONS_FETCHED,
  payload: locations,
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
  locationsFetched,
  tripSet,
  locationUpdated,
  searchLocations,
  changeSearchText,
};
