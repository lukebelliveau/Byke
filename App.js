import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps';

import api from './src/api';

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
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }
      }))
    })

    api.getAllStations()
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
          this.state.region === null || this.state.stations === null ? <View /> :
            <MapView
              style={styles.container}
              region={this.state.region}
            >
              {
                this.state.stations.map((station, index) => (
                  <MapView.Marker
                    coordinate={station}
                    key={index}
                  />
                ))
              }
            </MapView>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
