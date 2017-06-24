import React from 'react';
import { TouchableOpacity } from 'react-native';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import LocationList from '../../src/SearchBar/LocationList';
import testLocations from '../testLocations';

it('renders a ScrollView of location cards', () => {
  const locations = renderer.create(
    <LocationList results={testLocations} onSelect={() => {}} />
  );

  expect(locations).toMatchSnapshot();
});

it('calls onSelect when an option is selected', () => {
  const onSelect = jest.fn();
  const locations = shallow(
    <LocationList results={testLocations} tripSet={onSelect} />
  );
  const firstLocation = testLocations[0];
  firstLocation.coordinates = {
    latitude: firstLocation.geometry.location.lat,
    longitude: firstLocation.geometry.location.lng,
  };

  const card = locations.find({ testId: `${firstLocation.name}Card` }).dive();
  const button = card.find({ testId: `${firstLocation.name}Button` }).dive();

  button.find(TouchableOpacity).simulate('press');

  expect(onSelect).toBeCalledWith(firstLocation.coordinates);
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
