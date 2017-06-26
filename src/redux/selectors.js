// @flow
import { State } from '../Types';
const getCoordinates = (state: State) => ({
  latitude: state.region.latitude,
  longitude: state.region.longitude,
});

export default {
  getCoordinates,
};
