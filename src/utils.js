// @flow
import { Location } from './Types';

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

const findClosestStation = (currentLocation, stations) => {
  console.log('IN FUNCTION');
  let closestFound = {
    station: null,
    distance: Number.POSITIVE_INFINITY,
  };

  stations.forEach((station, index) => {
    const lateralDistance = Math.abs(
      currentLocation.latitude - station.latitude
    );
    const longitudalDistance = Math.abs(
      currentLocation.longitude - station.longitude
    );
    const distance = lateralDistance + longitudalDistance / 2;

    if (distance < closestFound.distance)
      closestFound = { station: station.id, index: index, distance: distance };
  });

  return closestFound.station;
};

export default {
  computeRegionThatFitsAllPoints,
  findClosestStation,
};