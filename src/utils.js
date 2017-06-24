const computeRegionThatFitsAllPoints = landmarks => {
  let top = -100;
  let bottom = 100;
  let left = 100;
  let right = -100;

  landmarks.forEach(landmark => {
    if (landmark.latitude > right) right = landmark.latitude;
    if (landmark.latitude < left) left = landmark.latitude;
    if (landmark.longitude > top) top = landmark.longitude;
    if (landmark.longitude < bottom) bottom = landmark.longitude;
  });

  const longitude = (top - bottom) / 2 + bottom;
  const latitude = (right - left) / 2 + left;
  const latitudeDelta = right - left;
  const longitudeDelta = top - bottom + 0.03;

  return {
    latitude,
    longitude,
    latitudeDelta,
    longitudeDelta,
  };
};

export default computeRegionThatFitsAllPoints;
