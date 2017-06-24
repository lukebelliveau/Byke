import update from 'immutability-helper';
import { types } from './actions';

const initialState = {
  isLoading: false,
  stations: [],
};
const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.LOADING_STARTED:
      return update(state, {
        isLoading: { $set: true },
      });
    case types.LOADING_FINISHED:
      return update(state, {
        isLoading: { $set: false },
      });
    case types.STATIONS_FETCHED:
      return update(state, {
        stations: { $set: action.payload },
      });
    default:
      return state;
  }
};

export default reducer;
