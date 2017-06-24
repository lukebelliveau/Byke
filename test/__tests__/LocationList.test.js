import React from 'react';
import { TouchableOpacity } from 'react-native';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import LocationList from '../../src/LocationList';
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
    <LocationList results={testLocations} onSelect={onSelect} />
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
