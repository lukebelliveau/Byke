import React from 'react';
import { View } from 'react-native';
import MapView from 'react-native-maps';

import StationMarker from './StationMarker';
import CurrentLocationMarker from './CurrentLocationMarker';
import { modes } from '../../../redux/reducers';
import utils from '../../../utils';

const Markers = ({ mode, trip, stations, currentLocation }) => {
  let stationMarkers;
  switch (mode) {
    case modes.tripDisplay:
      stationMarkers = (
        <TripView
          trip={trip}
          stations={stations}
          currentLocation={currentLocation}
        />
      );
      break;
    default:
      stationMarkers = (
        <Stations stations={stations} currentLocation={currentLocation} />
      );
  }

  return (
    <View>
      <CurrentLocationMarker coordinate={currentLocation} />
      {stationMarkers}
    </View>
  );
};

const TripView = ({ trip, stations, currentLocation }) =>
  <View>
    <MapView.Marker coordinate={trip.destination} />
    <Stations
      stations={utils.getSubarrayByIndices(stations, trip.closeToLocation)}
      currentLocation={currentLocation}
    />
  </View>;

const Stations = ({ stations, currentLocation }) =>
  <View>
    {stations.map((station, index) => {
      return (
        <StationMarker
          testId={station.stationName}
          stationName={station.stationName}
          coordinate={station}
          currentLocation={currentLocation}
          availableBikes={station.availableBikes}
          availableDocks={station.availableDocks}
          key={index}
        />
      );
    })}
  </View>;

export default Markers;
