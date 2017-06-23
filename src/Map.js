import React from 'react';
import { Keyboard } from 'react-native';
import MapView from 'react-native-maps';

import StationMarker from './StationMarker';

const Map = ({ region, stations, style }) =>
  <MapView
    style={style}
    region={region}
    initialRegion={region}
    onPress={Keyboard.dismiss}
  >
    <MapView.Marker coordinate={region} />
    {stations.map((station, index) =>
      <StationMarker
        coordinate={station}
        stationName={station.stationName}
        availableBikes={station.availableBikes}
        key={index}
      />
    )}
  </MapView>;

export default Map;
