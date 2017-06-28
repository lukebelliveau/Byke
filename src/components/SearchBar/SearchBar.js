// @flow
import React, { Component } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from 'react-native';

type PropTypes = {
  searchText: string,
  changeSearchText: string => void,
  searchPlaces: string => void,
};

const SearchBar = ({
  searchText,
  changeSearchText,
  searchPlaces,
  trip,
}: PropTypes) =>
  <View style={[styles.container]}>
    {trip
      ? <TouchableOpacity style={styles.button}>
          <Text style={styles.arrow}>{'<'}</Text>
        </TouchableOpacity>
      : null}

    <TextInput
      style={styles.input}
      underlineColorAndroid="transparent"
      placeholder="Where are you going?"
      placeholderTextColor="lightgray"
      value={searchText}
      onChangeText={changeSearchText}
      onSubmitEditing={() => searchPlaces(searchText)}
      returnKeyType="go"
      selectionColor="darkgrey"
    />
  </View>;

const styles = StyleSheet.create({
  button: {
    flex: Platform.OS === 'ios' ? 1 : 0,
    backgroundColor: '#1b81e5',
    width: 40,
    height: 40,
    borderRadius: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrow: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 20,
    paddingLeft: 10,
    backgroundColor: 'dodgerblue',
    alignItems: 'center',
    shadowColor: 'black',
    shadowRadius: 10,
    shadowOpacity: 100,
    elevation: 10,
  },
  input: {
    flex: Platform.OS === 'ios' ? 6 : 0,
    maxHeight: Platform.OS === 'ios' ? 25 : 50,
    fontSize: 15,
    width: '75%',
    backgroundColor: '#1b81e5',
    color: 'white',
    borderRadius: 10,
    margin: 20,
    padding: 5,
    paddingLeft: 10,
  },
});

export default SearchBar;
