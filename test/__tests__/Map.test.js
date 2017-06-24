import React from 'react';
import renderer from 'react-test-renderer';
import Map from '../../src/Map';
import { shallow } from 'enzyme';
import { Keyboard } from 'react-native';

const region = {
  latitude: 1,
  longitude: 2,
  latitudeDelta: 3,
  longitudeDelta: 4,
};
const stations = [
  { stationName: 'station1', availableBikes: 2, latitude: 50, longitude: 60 },
];

it('renders with location marker and markers for stations', () => {
  const map = renderer
    .create(<Map region={region} stations={stations} style={{}} />)
    .toJSON();

  expect(map).toMatchSnapshot();
});

it('renders a trip with marker in location and destination', () => {
  const trip = {
    currentLocation: { latitude: 99, longitude: 99 },
    destination: { latitude: 199, longitude: 199 },
  };
  const map = renderer
    .create(<Map region={region} stations={stations} style={{}} trip={trip} />)
    .toJSON();

  expect(map).toMatchSnapshot();
});

it('dismisses the keyboard when pressed', () => {
  Keyboard.dismiss = jest.fn();
  const map = shallow(<Map region={region} stations={stations} style={{}} />);

  map.simulate('press');

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
