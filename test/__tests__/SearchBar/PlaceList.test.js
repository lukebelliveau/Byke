import React from 'react';
import { createStore } from 'redux';

import connectToRedux from '../../connectToRedux';
import reducers from '../../../src/redux/reducers';
import actions from '../../../src/redux/actions';
import PlaceList from '../../../src/components/SearchBar/PlaceListContainer';
import testLocations from '../../testLocations';

it('renders a ScrollView of location cards', () => {
  const store = createStore(reducers);
  store.dispatch(actions.placesFetched(testLocations.results));
  const locations = connectToRedux(<PlaceList />, store);

  expect(locations).toMatchSnapshot();
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
