import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView from 'react-native-maps';

import api from './src/api';
import Map from './src/Map';

const getLocation = (success, error = null, options = {}) => navigator.geolocation.getCurrentPosition(success, error, options);

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      region: null,
      stations: null,
    };
  };

  componentDidMount() {
    getLocation((location) => {
      this.setState((prevState) => ({
        region: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }
      }))
    })

    api.getAllStations(`{ stationName, availableBikes, latitude, longitude }`)
      .then(stations => {
        this.setState({
          stations
        })
      })
  }

  render() {
    return (
      <View style={styles.container}>
        {
          this.state.region == null || this.state.stations == null ? <View /> :
            <Map style={styles.map} region={this.state.region} stations={this.state.stations} />
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 3,
  }
});
