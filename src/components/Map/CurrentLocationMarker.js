import React from 'react';
import { View, Keyboard } from 'react-native';
import MapView from 'react-native-maps';

const CurrentLocationMarker = ({ coordinate }) =>
  <MapView.Marker
    coordinate={coordinate}
    title="Your location"
    onPress={Keyboard.dismiss}
  >
    <View style={style} />
  </MapView.Marker>;

const style = {
  width: 20,
  height: 20,
  borderRadius: 50,
  backgroundColor: 'dodgerblue',
  borderColor: 'white',
  borderWidth: 1,
};

export default CurrentLocationMarker;
