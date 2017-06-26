// @flow
import { State } from '../Types';
const getLatitude = (state: State) => {
  state.region.latitude;
};
const getLongitude = (state: State) => state.region.longitude;
const getCoordinates = (state: State) => ({
  latitude: getLatitude(state),
  longitude: getLongitude(state),
});

export default {
  getLatitude,
  getLongitude,
  getCoordinates,
};
