// @flow
import React from 'react';
import { connect } from 'react-redux';
import SearchBar from './SearchBar';
import actions from '../../redux/actions';

const mapDispatchToProps = dispatch => ({
  placesFetched: places => {
    dispatch(actions.placesFetched(places));
  },
  loadingStarted: () => {
    dispatch(actions.loadingStarted());
  },
  loadingFinished: () => {
    dispatch(actions.loadingFinished());
  },
  searchPlaces: query => {
    dispatch(actions.searchPlaces(query));
  },
  changeSearchText: text => {
    dispatch(actions.changeSearchText(text));
  },
  exitTrip: () => {
    dispatch(actions.exitTrip());
  },
});

const mapStateToProps = state => ({
  region: state.region,
  searchText: state.searchText,
  trip: state.trip,
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
