import React from 'react';
import { View } from 'react-native';

export default ({ color }) => <View style={style(color)} />;

const style = color => ({
  width: 20,
  height: 20,
  borderRadius: 20 / 2,
  backgroundColor: color,
});
