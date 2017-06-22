import React from 'react';
import MapView from 'react-native-maps';

import Circle from './Circle';

const Marker = ({ coordinate, stationName, availableBikes }) =>
  <MapView.Marker
    coordinate={coordinate}
    title={stationName}
    description={`${availableBikes} bikes available`}
  >
    <Circle color={availableBikes > 5 ? 'green' : 'red'} />
  </MapView.Marker>;

export default Marker;
