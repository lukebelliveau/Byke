// @flow
import React, { Component } from 'react';
import { View, TextInput, StyleSheet, Platform } from 'react-native';

const initialState = {
  enteredText: '',
};

class EnterDestination extends Component {
  state = initialState;
  constructor(props) {
    super(props);
    this.props = props;
  }

  textChanged = event => {
    this.setState({ enteredText: event });
  };

  render() {
    return (
      <View style={[this.props.style, styles.container]}>
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Where are you going?"
          placeholderTextColor="lightgray"
          onChangeText={this.textChanged}
          onSubmitEditing={() => this.props.onSubmit(this.state.enteredText)}
          returnKeyType="go"
        />
      </View>
    );
  }
}

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
