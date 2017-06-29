// @flow
import React from 'react';
import { connect } from 'react-redux';
import PlaceList from './PlaceList';
import actions from '../../redux/actions';

const mapDispatchToProps = dispatch => ({
  tripSet: trip => {
    dispatch(actions.tripSet(trip));
  },
});

const mapStateToProps = state => ({
  places: state.places,
  trip: state.trip,
  mode: state.mode,
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaceList);
