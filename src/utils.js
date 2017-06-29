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

const centerRegionOnUser = location => ({
  latitude: location.latitude,
  longitude: location.longitude,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
});

const getSubarrayByIndices = (array, indices) => {
  const toReturn = indices.map(index => array[index]);

  return toReturn;
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

const findClosestStation = (location: Location, stations: Array<Station>) => {
  const indices = new Array(stations.length);
  for (let i = 0; i < stations.length; i++) indices[i] = i;
  indices.sort((a, b) => {
    const distanceToA = computeDistance(location, stations[a]);
    const distanceToB = computeDistance(location, stations[b]);
    return distanceToA < distanceToB ? -1 : distanceToA > distanceToB ? 1 : 0;
  });

  return indices;
};

const computeDistance = (location, station) => {
  const lateralDistance = Math.abs(location.latitude - station.latitude);
  const longitudalDistance = Math.abs(location.longitude - station.longitude);

  return lateralDistance + longitudalDistance / 2;
};

const openDirections = (origin, destination) => {
  Linking.openURL(
    `https://www.google.com/maps/dir/?api=1&origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}&travelmode=bicycling`
  );
};

export default {
  computeRegionThatFitsAllPoints,
  centerRegionOnUser,
  findClosestStation,
  openDirections,
  displayNavigationAlert,
  getSubarrayByIndices,
};
