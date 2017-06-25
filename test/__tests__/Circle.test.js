import React from 'react';
import renderer from 'react-test-renderer';
import Circle from '../../src/components/shared/Circle';

describe('Marker', () => {
  it('should be green', () => {
    const marker = renderer.create(<Circle color={'green'} />).toJSON();

    expect(marker).toMatchSnapshot();
  });

  it('should be red', () => {
    const marker = renderer.create(<Circle color={'red'} />).toJSON();

    expect(marker).toMatchSnapshot();
  });
});
