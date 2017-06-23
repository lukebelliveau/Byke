import React from 'react';
import { StyleSheet, View } from 'react-native';

import api from './api';
import Map from './Map';
import EnterDestination from './EnterDestination';

const getLocation = (success, error = null, options = {}) =>
  navigator.geolocation.getCurrentPosition(success, error, options);

class Byke extends React.Component {
  constructor() {
    super();
    this.state = {
      region: null,
      stations: [],
    };
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

  render() {
    return this.state.region == null
      ? <View />
      : <View style={styles.container}>
          <EnterDestination style={styles.destination} />
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
