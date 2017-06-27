import React from 'react';
import { Alert, Linking } from 'react-native';
import utils from '../../src/utils';

it('opens an alert with link to Maps', () => {
  Alert.alert = jest.fn();

  const currentLocation = { latitude: 75, longitude: 75 };
  const stationName = 'A station';
  const stationCoordinates = { latitude: 25, longitude: 25 };

  utils.displayNavigationAlert(
    currentLocation,
    stationName,
    stationCoordinates,
    12
  );

  const buttons = [
    { text: 'Cancel' },
    {
      text: 'OK',
      onPress: () => utils.openDirections(currentLocation, stationCoordinates),
    },
  ];

  expect(Alert.alert).toBeCalledWith(
    'Open Maps?',
    expect.stringContaining(stationName),
    expect.arrayContaining([
      { text: 'Cancel' },
      {
        text: 'OK',
        onPress: expect.any(Function),
      },
    ])
  );
});

it('opens alert with link to Google Maps', () => {
  jest.mock('Linking', () => {
    return {
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      openURL: jest.fn(),
      canOpenURL: jest.fn(),
      getInitialURL: jest.fn(),
    };
  });

  const origin = { latitude: 50, longitude: 50 };
  const destination = { latitude: 100, longitude: 100 };

  utils.openDirections(origin, destination);

  expect(Linking.openURL).toBeCalledWith(
    `https://www.google.com/maps/dir/?api=1&origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}&travelmode=bicycling`
  );
});
