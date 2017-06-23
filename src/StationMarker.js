// @flow
import React from 'react';
import MapView from 'react-native-maps';
import { Keyboard } from 'react-native';

import Circle from './Circle';

const Marker = ({
  coordinate,
  stationName,
  availableBikes,
}: {
  coordinate: Object,
  stationName: string,
  availableBikes: number,
}) =>
  <MapView.Marker
    coordinate={coordinate}
    title={stationName}
    description={`${availableBikes} bikes available`}
    onPress={Keyboard.dismiss}
  >
    <Circle color={availableBikes > 5 ? 'green' : 'red'} />
  </MapView.Marker>;

export default Marker;
