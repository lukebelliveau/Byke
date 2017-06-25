const getLatitude = state => state.region.latitude;
const getLongitude = state => state.region.longitude;
const getCoordinates = state => ({
  latitude: getLatitude(state),
  longitude: getLongitude(state),
});

export default {
  getLatitude,
  getLongitude,
  getCoordinates,
};
