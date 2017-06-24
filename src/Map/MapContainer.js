import { connect } from 'react-redux';
import MapComponent from './Map';
import actions from '../redux/actions';

const mapDispatchToProps = dispatch => ({
  startLoading: () => {
    dispatch(actions.loadingStarted());
  },
});

const Map = connect(mapDispatchToProps)(MapComponent);

export default Map;
