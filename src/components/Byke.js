// @flow
import React from 'react';
import { StyleSheet, View } from 'react-native';

import Map from './Map/MapContainer';
import SearchBar from './SearchBar/SearchBarContainer';
import PlaceList from './SearchBar/PlaceListContainer';
import Loading from './shared/Loading';
import TripLauncher from './TripLauncher/TripLauncher';

class Byke extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <View style={styles.container}>
        <SearchBar />
        <View style={styles.map}>
          <Map />
          <PlaceList />
          <Loading />
          <TripLauncher />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 6,
  },
});

export default Byke;
