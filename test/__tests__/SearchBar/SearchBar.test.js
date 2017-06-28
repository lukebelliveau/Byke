import React from 'react';
import { TextInput } from 'react-native';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import SearchBar from '../../../src/components/SearchBar/SearchBar';

const userSubmitted = jest.fn();
const entryString = 'DisneyWorld';

it('calls userSubmitted callback when user presses submit', () => {
  const input = shallow(
    <SearchBar searchText={entryString} searchPlaces={userSubmitted} />
  ).find(TextInput);

  input.simulate('submitEditing');

  expect(userSubmitted).toBeCalledWith(entryString);
});

it('does not contain a back button when not in trip mode', () => {
  const tripState = {
    destination: {
      latitude: 50,
      longitude: 50,
    },
  };
  const searchBar = renderer
    .create(<SearchBar searchText={entryString} searchPlaces={userSubmitted} trip={null}/>)
    .toJSON();

  expect(searchBar).toMatchSnapshot();
});

it('contains a back button when in trip mode', () => {
  const tripState = {
    destination: {
      latitude: 50,
      longitude: 50,
    },
  };
  const searchBar = renderer
    .create(<SearchBar searchText={entryString} searchPlaces={userSubmitted} trip={tripState}/>)
    .toJSON();

  expect(searchBar).toMatchSnapshot();
});
