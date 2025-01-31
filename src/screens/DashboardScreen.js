import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../../components/header';
import MyTabs from './MyTabs';

const DashboardScreen = () => {
  return (
    <View style={styles.container}>
        <Header />
      <Text style={styles.text}>Dashboard</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333', // Set text color
  },
});

export default DashboardScreen;
