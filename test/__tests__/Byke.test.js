import React from 'react';
import renderer from 'react-test-renderer';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';
import { createWaitForElement } from 'enzyme-wait';

import api from '../../src/api';
import Byke from '../../src/components/Byke';
import connectToRedux from '../connectToRedux';
import reducers from '../../src/redux/reducers';

api.searchPlaces = jest.fn(() => new Promise(resolve => resolve([])));

it('runs', () => {
  const store = createStore(reducers);
  const app = connectToRedux(<Byke />, store).toJSON();

  expect(app).toMatchSnapshot();
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

/*
 * CONFIG (react-test-renderer & react-native-maps don't play nice)
 * see https://github.com/airbnb/react-native-maps/issues/889
 * */
jest.mock('react-native-maps', () => {
  const React = require.requireActual('react');
  const MapView = require.requireActual('react-native-maps');

  class MockCallout extends React.Component {
    render() {
      return React.createElement('Callout', this.props, this.props.children);
    }
  }

  class MockMarker extends React.Component {
    render() {
      return React.createElement('Marker', this.props, this.props.children);
    }
  }

  class MockMapView extends React.Component {
    animateToRegion() {}
    render() {
      return React.createElement('MapView', this.props, this.props.children);
    }
  }

  MockCallout.propTypes = MapView.Callout.propTypes;
  MockMarker.propTypes = MapView.Marker.propTypes;
  MockMapView.propTypes = MapView.propTypes;
  MockMapView.Marker = MockMarker;
  MockMapView.Callout = MockCallout;
  return MockMapView;
});
