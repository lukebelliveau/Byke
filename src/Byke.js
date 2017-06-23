// @flow
import React from 'react';
import { StyleSheet, View, AsyncStorage } from 'react-native';

import api from './api';
import Map from './Map';
import EnterDestination from './EnterDestination';
import getLocation from './geolocation';

import LocationList from './LocationList';

import testLocations from '../test/testLocations';

const initialState = {
  region: null,
  stations: [],
  results: [],
};

class Byke extends React.Component {
  state = initialState;
  constructor() {
    super();

    this.searchDestination = this.searchDestination.bind(this);
  }

  componentDidMount() {
    this.updateLocation();

    this.loadStations();
    // setInterval(() => this.updateLocation(), 1000);
  }

  updateLocation() {
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
          console.log('Loading stations from cache...');
          this.setState({
            stations: JSON.parse(stations),
          });
        } else {
          this.fetchStationInfo();
        }
      })
      .catch(e => {
        console.log('error fetching stations!');
        console.log(e);
      });
  }

  fetchStationInfo = () => {
    console.log('Fetching stations from web...');
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
            <Map region={this.state.region} stations={this.state.stations} />
            <LocationList results={this.state.results} />
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
