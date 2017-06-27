import React from 'react';
import { Linking } from 'react-native';
import utils from '../../src/utils';

it('opens Google Maps with origin and destination coordinates', () => {
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
    `https://www.google.com/maps/dir/?api=1&origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}`
  );
});
