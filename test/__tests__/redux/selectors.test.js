import selectors from '../../../src/redux/selectors';

it('returns coordinates', () => {
  const state = {
    region: {
      latitude: 50,
      longitude: 50,
    },
  };

  expect(selectors.getCoordinates(state)).toEqual({
    latitude: state.region.latitude,
    longitude: state.region.longitude,
  });
});
