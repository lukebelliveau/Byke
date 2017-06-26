import React from 'react';
import { TextInput } from 'react-native';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import SearchBar from '../../../src/components/SearchBar/SearchBar';

const userSubmitted = jest.fn();

it('should render', () => {
  const input = renderer.create(<SearchBar onSubmit={userSubmitted} />);

  expect(input).toMatchSnapshot();
});

it('calls userSubmitted callback when user presses submit', () => {
  const userSubmitted = jest.fn();
  const entryString = 'DisneyWorld';
  const input = shallow(
    <SearchBar searchText={entryString} searchPlaces={userSubmitted} />
  ).find(TextInput);

  input.simulate('submitEditing');

  expect(userSubmitted).toBeCalledWith(entryString);
});
