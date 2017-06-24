// @flow
import React from 'react';
import { StyleSheet, View } from 'react-native';

import api from './api';
import Map from './Map';
import EnterDestination from './EnterDestination';
import getLocation from './geolocation';

import LocationList from './LocationList';
import computeRegion from './utils';

import testLocations from '../test/testLocations';

const initialState = {
  region: null,
  results: [],
  trip: null,
};

class Byke extends React.Component {
  state = initialState;
  constructor() {
    super();

    this.watchLocation();

    this.searchDestination = this.searchDestination.bind(this);
  }

  watchLocation() {
    navigator.geolocation.watchPosition(
      location => {
        this.setState(prevState => ({
          region: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          },
        }));
      },
      null,
      {}
    );
  }

  componentDidMount() {
    this.centerRegionOnUser();
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
            <Map region={this.state.region} trip={this.state.trip} />
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
});

export default Byke;
