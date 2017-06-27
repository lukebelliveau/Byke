// @flow
import React from 'react';
import MapView from 'react-native-maps';
import { Keyboard } from 'react-native';
import utils from '../../utils';

import Circle from '../shared/Circle';

const Marker = ({
  coordinate,
  stationName,
  currentLocation,
  availableBikes,
  availableDocks,
}: {
  coordinate: Object,
  stationName: string,
  availableBikes: number,
}) => {
  return (
    <MapView.Marker
      coordinate={coordinate}
      title={stationName}
      description={`${availableBikes} bikes available, ${availableDocks} docks available`}
      onPress={Keyboard.dismiss}
      onCalloutPress={() =>
        utils.displayNavigationAlert(
          currentLocation,
          stationName,
          coordinate,
          availableBikes,
          availableDocks
        )}
    >
      <Circle color={availableBikes > 5 ? 'green' : 'red'} />
    </MapView.Marker>
  );
};

export default Marker;
