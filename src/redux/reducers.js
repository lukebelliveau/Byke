import { types } from './actions';

const initialState = {
  isLoading: false,
};
const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.LOADING_STARTED:
      return { isLoading: true };
    case types.LOADING_FINISHED:
      return { isLoading: false };
    default:
      return state;
  }
};

export default reducer;
