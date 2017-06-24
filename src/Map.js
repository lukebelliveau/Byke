// @flow
import React from 'react';
import { Keyboard, View } from 'react-native';
import MapView from 'react-native-maps';

import StationMarker from './StationMarker';

type Station = {
  latitude: number,
  longitude: number,
  stationName: string,
  availableBikes: number,
};

const Map = ({
  region,
  stations,
  style,
  trip,
}: {
  region: { number: string },
  stations: Array<Station>,
  style: Object,
}) =>
  <MapView
    style={{ flex: 1 }}
    region={region}
    initialRegion={region}
    onPress={Keyboard.dismiss}
  >
    {trip
      ? <View>
          <MapView.Marker coordinate={trip.currentLocation} pinColor="blue" />
          <MapView.Marker coordinate={trip.destination} />
        </View>
      : <MapView.Marker coordinate={region} />}

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
