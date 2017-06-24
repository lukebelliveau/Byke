import React from 'react';
import renderer from 'react-test-renderer';
import MapView from 'react-native-maps';
import { shallow } from 'enzyme';
import { Keyboard } from 'react-native';
import { createWaitForElement } from 'enzyme-wait';
import toJson from 'enzyme-to-json';

import Map from '../../src/Map';
import StationMarker from '../../src/StationMarker';
import api from '../../src/api';

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

it('fetches stations and displays them', done => {
  const waitForStations = createWaitForElement(StationMarker);
  const map = shallow(<Map region={region} />);

  map.instance().componentDidMount();

  waitForStations(map).then(component => {
    expect(toJson(component)).toMatchSnapshot();
    done();
  });
});

it('renders a trip with marker in location and destination', () => {
  const map = renderer.create(<Map region={region} trip={trip} />).toJSON();

  expect(map).toMatchSnapshot();
});

it('dismisses the keyboard when pressed', () => {
  Keyboard.dismiss = jest.fn();
  const map = shallow(<Map region={region} stations={stations} style={{}} />);

  map.find(MapView).simulate('press');

  expect(Keyboard.dismiss.mock.calls.length).toBeGreaterThan(0);
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
