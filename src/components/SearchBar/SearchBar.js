// @flow
import React, { Component } from 'react';
import { View, TextInput, StyleSheet, Platform } from 'react-native';

type PropTypes = {
  searchText: string,
  changeSearchText: string => void,
  searchLocations: string => void,
};

const SearchBar = ({
  searchText,
  changeSearchText,
  searchLocations,
}: PropTypes) =>
  <View style={[styles.container]}>
    <TextInput
      style={styles.input}
      underlineColorAndroid="transparent"
      placeholder="Where are you going?"
      placeholderTextColor="lightgray"
      value={searchText}
      onChangeText={changeSearchText}
      onSubmitEditing={() => searchLocations(searchText)}
      returnKeyType="go"
    />
  </View>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'dodgerblue',
    flexDirection: 'column-reverse',
    alignItems: 'center',
    shadowColor: 'black',
    shadowRadius: 10,
    shadowOpacity: 100,
    elevation: 10,
  },
  input: {
    flex: Platform.OS === 'ios' ? 1 : 0,
    maxHeight: Platform.OS === 'ios' ? 25 : 50,
    fontSize: 15,
    width: '75%',
    backgroundColor: 'deepskyblue',
    color: 'white',
    borderRadius: 10,
    margin: 20,
    padding: 5,
    paddingLeft: 10,
  },
});

export default SearchBar;
