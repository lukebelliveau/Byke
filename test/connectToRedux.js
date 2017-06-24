import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';

export default (Component, store) => renderer.create(<Provider store={store}>{Component}</Provider>);