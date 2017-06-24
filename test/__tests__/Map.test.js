import React from 'react';
import { createStore } from 'redux';
import renderer from 'react-test-renderer';

import Map from '../../src/Map/MapContainer';
import api from '../../src/api';
import connectToRedux from '../connectToRedux';
import reducers from '../../src/redux/reducers';
import actions from '../../src/redux/actions';

const region = {
  latitude: 1,
  longitude: 2,
  latitudeDelta: 3,
  longitudeDelta: 4,
};
const stations = [
  { stationName: 'station1', availableBikes: 1, latitude: 50, longitude: 60 },
];
const trip = {
  currentLocation: { latitude: 99, longitude: 99 },
  destination: { latitude: 199, longitude: 199 },
};

api.getAllStations = jest.fn(() => new Promise(resolve => resolve(stations)));

it.skip('displays stations in state', () => {
  const store = createStore(reducers);
  store.dispatch(actions.stationsFetched(stations));
  const map = connectToRedux(<Map />, store);

  expect(map).toMatchSnapshot();
});

it.skip('renders a trip with marker in location and destination', () => {
  const store = createStore(reducers);
  store.dispatch(actions.tripSet(trip.destination));

  const map = connectToRedux(<Map />, store).toJSON();

  expect(map).toMatchSnapshot();
});

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
