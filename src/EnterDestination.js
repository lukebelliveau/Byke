// @flow
import React from 'react';
import { View, TextInput, StyleSheet, Platform } from 'react-native';

const EnterDestination = ({ style }: { style: Object }) =>
  <View style={[style, styles.container]}>
    <TextInput
      style={styles.input}
      underlineColorAndroid="transparent"
      placeholder="Where are you going?"
      placeholderTextColor="lightgray"
    />
  </View>;

const styles = StyleSheet.create({
  container: {
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

export default EnterDestination;
