import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import Header from '../../components/header';

 function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Header />
      <Text>Tickets</Text>
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

export default SettingsScreen;