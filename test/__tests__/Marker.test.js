import React from 'react';
import renderer from 'react-test-renderer';

import Marker from '../../src/StationMarker';

describe('Marker', () => {
  const coordinate = { latitude: 50, longitude: 50 };
  it('should be green', () => {
    const marker = renderer
      .create(
        <Marker
          coordinate={coordinate}
          stationName="station"
          availableBikes={8}
        />
      )
      .toJSON();

    expect(marker).toMatchSnapshot();
  });

  it('should be red', () => {
    const marker = renderer
      .create(
        <Marker
          coordinate={coordinate}
          stationName="station"
          availableBikes={4}
        />
      )
      .toJSON();

    expect(marker).toMatchSnapshot();
  });
});
