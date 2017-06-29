// @flow
import { State } from '../Types';
const getCoordinates = (state: State) => ({
  latitude: state.currentLocation.latitude,
  longitude: state.currentLocation.longitude,
});

export default {
  getCoordinates,
};
