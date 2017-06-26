// @flow
import React from 'react';
import { connect } from 'react-redux';
import LocationList from './LocationList';
import actions from '../../redux/actions';

const mapDispatchToProps = dispatch => ({
  tripSet: trip => {
    dispatch(actions.tripSet(trip));
  },
});

const mapStateToProps = state => ({
  locations: state.locations,
  trip: state.trip,
});

export default connect(mapStateToProps, mapDispatchToProps)(LocationList);
