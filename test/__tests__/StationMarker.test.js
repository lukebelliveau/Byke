import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { Keyboard } from 'react-native';

import StationMarker from '../../src/components/Map/StationMarker';

const coordinate = { latitude: 50, longitude: 50 };
it('should be green', () => {
  const marker = renderer
    .create(
      <StationMarker
        coordinate={coordinate}
        stationName="station"
        availableBikes={8}
        availableDocks={10}
      />
    )
    .toJSON();

  expect(marker).toMatchSnapshot();
});

it('should be red', () => {
  const marker = renderer
    .create(
      <StationMarker
        coordinate={coordinate}
        stationName="station"
        availableBikes={4}
        availableDocks={10}
      />
    )
    .toJSON();

  expect(marker).toMatchSnapshot();
});

it('dismisses the keyboard when pressed', () => {
  Keyboard.dismiss = jest.fn();
  const marker = shallow(
    <StationMarker
      coordinate={coordinate}
      stationName="Lincoln Park"
      availableBikes={6}
    />
  );

  marker.simulate('press');

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
