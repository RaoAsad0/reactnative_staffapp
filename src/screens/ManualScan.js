import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

 function ManualScan() {
  return (
    <View style={styles.container}>
      <Text>ManualScan</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ManualScan;