// @flow
import { connect } from 'react-redux';
import MapComponent from './Map';
import actions from '../../redux/actions';

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
  locationUpdated: location => {
    dispatch(actions.locationUpdated(location));
  },
});

const mapStateToProps = state => ({
  stations: state.stations,
  trip: state.trip,
  currentLocation: state.currentLocation,
  region: state.region,
});

const Map = connect(mapStateToProps, mapDispatchToProps)(MapComponent);

export default Map;
