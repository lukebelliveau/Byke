import React from 'react';
import { TextInput } from 'react-native';
import renderer from 'react-test-renderer';
import { shallow , mount} from 'enzyme';

import LocationList, { LocationCard } from '../../src/LocationList';
import testLocations from '../testLocations';

it('renders a ScrollView of location cards', () => {
  const locations = renderer.create(
    <LocationList results={testLocations} onSelect={() => {}} />
  );

  expect(locations).toMatchSnapshot();
});