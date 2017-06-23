// @flow
import React from 'react';
import { StyleSheet, View } from 'react-native';

import api from './api';
import Map from './Map';
import EnterDestination from './EnterDestination';
import getLocation from './geolocation';

const initialState = {
  region: null,
  stations: [],
};

class Byke extends React.Component {
  state = initialState;
  constructor() {
    super();

    this.searchDestination = this.searchDestination.bind(this);
  }

  componentDidMount() {
    this.updateLocation();

    api
      .getAllStations(`{ stationName, availableBikes, latitude, longitude }`)
      .then(stations => {
        this.setState({
          stations,
        });
      });

    setInterval(() => this.updateLocation(), 1000);
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

  searchDestination = (searchQuery: string) => {
    api.searchPlaces(searchQuery, this.state.region.latitude, this.state.region.longitude)
      .then(res => console.log(res));
  };

  render() {
    return this.state.region == null
      ? <View />
      : <View style={styles.container}>
          <EnterDestination
            onSubmit={this.searchDestination}
            style={styles.destination}
          />
          <Map
            style={styles.map}
            region={this.state.region}
            stations={this.state.stations}
          />
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
