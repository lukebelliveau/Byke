// @flow
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  isLoading: state.isLoading,
});

const Loading = ({ isLoading }) =>
  isLoading
    ? <View style={styles.loadingContainer}>
        <View style={styles.loadingBox}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </View>
    : null;

const styles = StyleSheet.create({
  loadingBox: {
    position: 'absolute',
    bottom: 20,
    elevation: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    width: '50%',
    padding: 10,
  },
  loadingText: {
    fontSize: 30,
  },
  loadingContainer: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
});

export default connect(mapStateToProps)(Loading);
