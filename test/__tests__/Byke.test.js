import React from 'react';
import { shallow } from 'enzyme';
import { createWaitForElement } from 'enzyme-wait';

import api from '../../src/api';
import Byke from '../../src/Byke';
import Map from '../../src/Map';

api.searchPlaces = jest.fn(() => new Promise(resolve => resolve([])));

it('calls searchPlaces API with location when user submits destination', done => {
  const latitude = 50;
  const longitude = 50;
  mockPosition(latitude, longitude);
  api.getAllStations = jest.fn(() => new Promise(resolve => resolve([])));
  const waitForMap = createWaitForElement(Map);
  const searchQuery = 'DisneyWorld';
  const byke = shallow(<Byke />);
  byke.instance().componentDidMount();

  waitForMap(byke).then(component => {
    component.instance().searchDestination(searchQuery);

    expect(api.searchPlaces).toBeCalledWith(searchQuery, latitude, longitude);
    done();
  });
});

/*
 * CONFIG
 * */
const mockPosition = (latitude, longitude) => {
  const mockGetCurrentPosition = callback => {
    callback({
      coords: {
        latitude,
        longitude,
      },
    });
  };

  const mockGeolocation = {
    getCurrentPosition: jest.fn(mockGetCurrentPosition),
    watchPosition: jest.fn(),
  };

  global.navigator.geolocation = mockGeolocation;
};

const mockGeolocation = {
  getCurrentPosition: jest.fn(),
  watchPosition: jest.fn(),
};

global.navigator.geolocation = mockGeolocation;
