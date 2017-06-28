import React from 'react';
import { TextInput, TouchableOpacity } from 'react-native';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import SearchBar from '../../../src/components/SearchBar/SearchBar';

const userSubmitted = jest.fn();
const entryString = 'DisneyWorld';

const trip = {
  destination: {
    latitude: 50,
    longitude: 50,
  },
};

it('calls userSubmitted callback when user presses submit', () => {
  const input = shallow(
    <SearchBar searchText={entryString} searchPlaces={userSubmitted} />
  ).find(TextInput);

  input.simulate('submitEditing');

  expect(userSubmitted).toBeCalledWith(entryString);
});

it('does not contain a back button when not in trip mode', () => {
  const searchBar = renderer
    .create(
      <SearchBar
        searchText={entryString}
        searchPlaces={userSubmitted}
        trip={null}
      />
    )
    .toJSON();

  expect(searchBar).toMatchSnapshot();
});

it('contains a back button when in trip mode', () => {
  const searchBar = renderer
    .create(
      <SearchBar
        searchText={entryString}
        searchPlaces={userSubmitted}
        trip={trip}
      />
    )
    .toJSON();

  expect(searchBar).toMatchSnapshot();
});

it('exits trip when back button is pressed', () => {
  const exitTrip = jest.fn();
  const searchBar = shallow(
    <SearchBar
      searchText={entryString}
      searchPlaces={userSubmitted}
      trip={trip}
      exitTrip={exitTrip}
    />
  );

  searchBar.find(TouchableOpacity).simulate('press');

  expect(exitTrip).toBeCalled();
});
