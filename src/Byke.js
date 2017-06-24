// @flow
import React from 'react';
import { StyleSheet, View, AsyncStorage } from 'react-native';

import api from './api';
import Map from './Map';
import EnterDestination from './EnterDestination';
import getLocation from './geolocation';

import LocationList from './LocationList';
import computeRegion from './utils';

import testLocations from '../test/testLocations';

const initialState = {
  region: null,
  stations: [],
  results: [],
  trip: null,
};

class Byke extends React.Component {
  state = initialState;
  constructor() {
    super();

    this.searchDestination = this.searchDestination.bind(this);
  }

  componentDidMount() {
    this.centerRegionOnUser();

    this.loadStations();
    // setInterval(() => this.centerRegionOnUser(), 1000);
  }

  destinationSelected = destination => {
    getLocation(location => {
      this.setState({
        region: computeRegion([destination, location.coords]),
        results: [],
        trip: {
          currentLocation: location.coords,
          destination,
        },
      });
    });
  };

  centerRegionOnUser() {
    getLocation(location => {
      this.setState(prevState => ({
        region: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
      }));
    });
  }

  loadStations() {
    const stations = AsyncStorage.getItem('@Byke:stations')
      .then(stations => {
        if (stations !== null) {
          this.setState({
            stations: JSON.parse(stations),
          });
        } else {
          this.fetchStationInfo();
        }
      })
      .catch(e => {
        Error('error fetching stations!' + e);
      });
  }

  fetchStationInfo = () => {
    api
      .getAllStations(`{ stationName, availableBikes, latitude, longitude }`)
      .then(stations => {
        AsyncStorage.setItem(
          '@Byke:stations',
          JSON.stringify(stations)
        ).catch(e => console.log('error:' + e));
        this.setState({
          stations,
        });
      });
  };

  searchDestination = (searchQuery: string) => {
    api
      .searchPlaces(
        searchQuery,
        this.state.region.latitude,
        this.state.region.longitude
      )
      .then(response =>
        response.json().then(json => {
          this.setState({
            results: json.results,
          });
        })
      );
  };

  render() {
    return this.state.region == null
      ? <View />
      : <View style={styles.container}>
          <EnterDestination
            onSubmit={this.searchDestination}
            style={styles.destination}
          />
          <View style={styles.map}>
            <Map
              region={this.state.region}
              stations={this.state.stations}
              trip={this.state.trip}
            />
            <LocationList
              results={this.state.results}
              onSelect={this.destinationSelected}
            />
          </View>
        </View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  destination: {
    flex: 1,
  },
  map: {
    flex: 6,
  },
  stationInfo: {
    position: 'absolute',
    top: 0,
    right: 10,
    width: 50,
    height: 50,
  },
});

export default Byke;
