import { types } from './actions';

const initialState = {
  loading: false,
};
const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.LOADING_STARTED:
      return { loading: true };
    default:
      return state;
  }
};

export default reducer;
