import React from 'react';
import { View } from 'react-native';

export default ({ color }) => <View style={style(color)} />;

const style = color => ({
  width: 15,
  height: 15,
  borderRadius: 20 / 2,
  backgroundColor: color,
});
