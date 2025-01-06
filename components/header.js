// Header.js
import React, { useState,useEffect } from 'react';
import { View, StyleSheet ,Text} from 'react-native';

const Header = () => {

  return (
    <View style={styles.overlayContainer}>
  
      <Text style={styles.overlayText}>OUTMOSPHERE </Text>
      <Text style={styles.overlayText}>Accra 28-12-2024 at 7:00 Pm</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  overlayContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  overlayText: {
    color: '#3C200A', // White text
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Header;