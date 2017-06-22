import React from 'react';
import renderer from 'react-test-renderer';
import EnterDestination from '../../src/EnterDestination';

it('should render', () => {
  const input = renderer.create(<EnterDestination/>);

  expect(input).toMatchSnapshot();
})