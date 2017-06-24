export const types = {
  LOADING_FINISHED: 'LOADING_FINISHED',
  LOADING_STARTED: 'LOADING_STARTED',
};

const loadingStarted = () => ({
  type: types.LOADING_STARTED,
});

const loadingFinished = () => ({
  type: types.LOADING_FINISHED,
});

export default {
  loadingStarted,
  loadingFinished,
};
