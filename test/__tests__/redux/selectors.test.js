import selectors from '../../../src/redux/selectors';

it('returns coordinates', () => {
  const state = {
    currentLocation: {
      latitude: 50,
      longitude: 50,
    },
  };

  expect(selectors.getCoordinates(state)).toEqual({
    latitude: state.currentLocation.latitude,
    longitude: state.currentLocation.longitude,
  });
});
