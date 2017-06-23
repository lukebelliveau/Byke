import React from 'react';
import { shallow } from 'enzyme';

import api from '../../src/api';
import Byke from '../../src/Byke';

api.searchPlaces = jest.fn();

it('calls searchPlaces API when user submits destination', () => {
  const searchQuery = 'DisneyWorld';
  const byke = shallow(<Byke />);
  byke.instance().searchDestination(searchQuery);

  expect(api.searchPlaces).toBeCalledWith(searchQuery);
});

/*
 * CONFIG
 * */
const mockGetCurrentPosition = callback => {
  callback({
    coords: {
      latitude: 50,
      longitude: 50,
    },
  });
};

const mockGeolocation = {
  getCurrentPosition: jest.fn(mockGetCurrentPosition),
  watchPosition: jest.fn(),
};

global.navigator.geolocation = mockGeolocation;
