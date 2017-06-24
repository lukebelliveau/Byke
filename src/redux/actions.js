export const types = {
  LOADING_FINISHED: 'LOADING_FINISHED',
  LOADING_STARTED: 'LOADING_STARTED',
  STATIONS_FETCHED: 'STATIONS_FETCHED',
};

const loadingStarted = () => ({
  type: types.LOADING_STARTED,
});

const loadingFinished = () => ({
  type: types.LOADING_FINISHED,
});

const stationsFetched = stations => ({
  type: types.STATIONS_FETCHED,
  payload: stations,
});

export default {
  loadingStarted,
  loadingFinished,
  stationsFetched,
};
