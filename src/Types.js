export type Region = {
  latitude: number,
  longitude: number,
  latitudeDelta: number,
  longitudeDelta: number,
};

export type Location = {
  latitude: number,
  longitude: number,
};

export type Station = {
  latitude: number,
  longitude: number,
  stationName: string,
  availableBikes: number,
};

export type Trip = {
  currentLocation: Location,
  destination: Location,
};

export type State = {
  currentLocation: Location,
  isLoading: boolean,
  stations: Array<Object>,
  trip: ?Trip,
  places: Array<Place>,
  region: Region,
  searchText: string,
};
