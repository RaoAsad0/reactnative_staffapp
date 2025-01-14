import { View, Text, StyleSheet,StatusBar } from 'react-native';
import React from 'react';
import Header from '../../components/header';
import { color } from '../color/color';

 function ManualScan() {
  return (
    <View style={styles.container}>
       <StatusBar barStyle="dark-content" backgroundColor="white" />
      <Header />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white_FFFFFF,
  },
});

export default ManualScan;