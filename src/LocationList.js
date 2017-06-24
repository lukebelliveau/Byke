import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';

const LocationList = ({ results, onSelect }) => {
  return (
    <View
      style={styles.container}
      pointerEvents={results.length > 0 ? 'auto' : 'none'}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {results.map(result =>
          <LocationCard result={result} key={result.id} onSelect={onSelect} />
        )}
      </ScrollView>
    </View>
  );
};

const LocationCard = ({ result, onSelect }) => {
  console.log(result);
  return (
    <View style={styles.card}>
      <View style={styles.infoContainer}>
        <Info name={result.name} address={result.vicinity} />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          onSelect={onSelect}
          coordinates={{
            latitude: result.geometry.location.lat,
            longitude: result.geometry.location.lng,
          }}
        />
      </View>
    </View>
  );
};

const Button = ({ coordinates, onSelect }) => {
  console.log('BUTTON');
  console.log(coordinates);
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => onSelect(coordinates)}
    >
      <Text style={styles.buttonText}>
        GO
      </Text>
    </TouchableOpacity>
  );
};

const Info = ({ name, address }) =>
  <View style={{ flex: 1 }}>
    <Text style={styles.title}>{name}</Text>
    <Text style={styles.address}>{address}</Text>
  </View>;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    display: 'flex',
    top: 0,
    width: '100%',
    height: '100%',
    marginRight: '10%',
    paddingLeft: '5%',
    paddingRight: '5%',
  },
  card: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 150,
    backgroundColor: 'white',
    margin: 5,
    elevation: 5,
  },
  infoContainer: {
    flex: 4,
    paddingLeft: 10,
    paddingTop: 5,
  },
  title: {
    fontSize: 25,
  },
  address: {
    position: 'absolute',
    bottom: 5,
    fontSize: 15,
    width: '75%',
    color: 'gray',
  },
  buttonContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  button: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'ghostwhite',
  },
  buttonText: {
    fontSize: 40,
    color: 'deepskyblue',
  },
});

export default LocationList;
