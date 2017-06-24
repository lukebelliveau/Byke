import React from 'react';
import { TextInput } from 'react-native';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import api from '../../src/api';

import EnterDestination from '../../src/SearchBar/SearchBar';

const userSubmitted = jest.fn();

it('should render', () => {
  const input = renderer.create(<EnterDestination onSubmit={userSubmitted} />);

  expect(input).toMatchSnapshot();
});

it('calls userSubmitted callback when user presses submit', () => {
  const userSubmitted = jest.fn();
  const entryString = 'DisneyWorld';
  const input = shallow(<EnterDestination onSubmit={userSubmitted} />).find(
    TextInput
  );
  input.simulate('changeText', entryString);

  input.simulate('submitEditing');

  expect(userSubmitted).toBeCalledWith(entryString);
});
