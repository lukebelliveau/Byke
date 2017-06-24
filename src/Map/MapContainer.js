import React, { Component } from 'react';
import { connect } from 'react-redux';
import MapComponent from './Map';
import actions from '../redux/actions';

const mapDispatchToProps = dispatch => ({
  loadingStarted: () => {
    dispatch(actions.loadingStarted());
  },
  loadingFinished: () => {
    dispatch(actions.loadingFinished());
  },
  stationsFetched: stations => {
    dispatch(actions.stationsFetched(stations));
  },
});

const mapStateToProps = state => ({
  stations: state.stations,
});

const Map = connect(mapStateToProps, mapDispatchToProps)(MapComponent);

export default Map;
