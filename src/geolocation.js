const defaultPositionOptions: PositionOptions = {
  enableHighAccuracy: true,
  timeout: Math.POSITIVE_INFINITY,
  maximumAge: 0,
};

const defaultError = error => {
  console.log(error);
};

const getLocation = (
  success,
  error = defaultError,
  options = defaultPositionOptions
) => navigator.geolocation.getCurrentPosition(success, error, options);

export default getLocation;
