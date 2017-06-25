import React from 'react';
import { connect } from 'react-redux';
import SearchBar from './SearchBar';
import actions from '../../redux/actions';

const mapDispatchToProps = dispatch => ({
  locationsFetched: locations => {
    dispatch(actions.locationsFetched(locations));
  },
  loadingStarted: () => {
    dispatch(actions.loadingStarted());
  },
  loadingFinished: () => {
    dispatch(actions.loadingFinished());
  },
  searchLocations: query => {
    dispatch(actions.searchLocations(query));
  },
  changeSearchText: text => {
    dispatch(actions.changeSearchText(text));
  },
});

const mapStateToProps = state => ({
  region: state.region,
  searchText: state.searchText,
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
