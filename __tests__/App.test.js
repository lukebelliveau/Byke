import React from 'react';
import App from '../App';

import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const rendered = renderer.create(<App />).toJSON();
  expect(rendered).toBeTruthy();
});

it('loads the map to user geolocation', () => {
  const app = renderer.create(<App />).toJSON();
  expect(app).toMatchSnapshot();
});


/*
* CONFIG
* */
const mockGetCurrentPosition = (callback) => {callback({
  coords: {
    latitude: 50,
    longitude: 50,
  }
})};

const mockGeolocation = {
  getCurrentPosition: jest.fn(mockGetCurrentPosition),
  watchPosition: jest.fn()
};

global.navigator.geolocation = mockGeolocation;

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