type Region = {
  latitude: number,
  longitude: number,
  latitudeDelta: number,
  longitudeDelta: number,
};

type Location = {
  latitude: number,
  longitude: number,
};

type Station = {
  latitude: number,
  longitude: number,
  stationName: string,
  availableBikes: number,
};

type Trip = {
  currentLocation: Location,
  destination: Location,
};

type State = {
  isLoading: boolean,
  stations: Array<Object>,
  trip: ?Trip,
  locations: Array<Place>,
  region: Region,
  searchText: string,
};

export default {
  Region,
  Location,
  Station,
  Trip,
  State,
};
