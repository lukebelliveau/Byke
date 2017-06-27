// @flow
import { Alert, Linking } from 'react-native';
import { Location, Station } from './Types';

const computeRegionThatFitsAllPoints = (landmarks: Location) => {
  let top = -100;
  let bottom = 100;
  let left = 100;
  let right = -100;

  landmarks.forEach(landmark => {
    if (landmark.latitude > right) right = landmark.latitude;
    if (landmark.latitude < left) left = landmark.latitude;
    if (landmark.longitude > top) top = landmark.longitude;
    if (landmark.longitude < bottom) bottom = landmark.longitude;
  });

  const longitude = (top - bottom) / 2 + bottom;
  const latitude = (right - left) / 2 + left;
  const latitudeDelta = right - left + 0.005;
  const longitudeDelta = top - bottom + 0.005;

  return {
    latitude,
    longitude,
    latitudeDelta,
    longitudeDelta,
  };
};

const displayNavigationAlert = (
  currentLocation,
  stationName,
  stationCoordinates,
  availableBikes,
  availableDocks
) => {
  Alert.alert(
    'Open Maps?',
    `Get biking directions to ${stationName}?\nThere are ${availableBikes} bikes and ${availableDocks} docks available.`,
    [
      { text: 'Cancel' },
      {
        text: 'OK',
        onPress: () => openDirections(currentLocation, stationCoordinates),
      },
    ]
  );
};

const findClosestStation = (
  currentLocation: Location,
  stations: Array<Station>
) => {
  let closestFound = {
    station: null,
    distance: Number.POSITIVE_INFINITY,
  };

  stations.forEach(station => {
    const lateralDistance = Math.abs(
      currentLocation.latitude - station.latitude
    );
    const longitudalDistance = Math.abs(
      currentLocation.longitude - station.longitude
    );
    const distance = lateralDistance + longitudalDistance / 2;

    if (distance < closestFound.distance)
      closestFound = { station: station, distance: distance };
  });

  return closestFound.station;
};

const openDirections = (origin, destination) => {
  Linking.openURL(
    `https://www.google.com/maps/dir/?api=1&origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}&travelmode=bicycling`
  );
};

export default {
  computeRegionThatFitsAllPoints,
  findClosestStation,
  openDirections,
  displayNavigationAlert,
};
