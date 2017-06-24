// @flow
import React from 'react';
import { StyleSheet, View } from 'react-native';

import Map from './Map/MapContainer';
import SearchBar from './SearchBar/SearchBarContainer';
import LocationList from './SearchBar/LocationListContainer';
import Loading from './Loading';

class Byke extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <View style={styles.container}>
        <SearchBar style={styles.destination} />
        <View style={styles.map}>
          <Map />
          <LocationList />
          <Loading />
        </View>
      </View>
    );
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
