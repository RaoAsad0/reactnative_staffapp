// Header.js
import React, { useState,useEffect } from 'react';
import { View, StyleSheet ,Text} from 'react-native';

const Header = ({ activeTab }) => {
  const [isVisible, setIsVisible] = useState(false); 

  useEffect(() => {

    setIsVisible(activeTab === 'CheckIn'); 
  }, [activeTab]);

  return (
    <View style={styles.overlayContainer}>
  
      <Text style={styles.overlayText}>OUTMOSPHERE</Text>
      <Text style={styles.overlayText}>Accra 28-12-2024 at 7:00 Pm</Text>
      <Text style={styles.overlayText}>ID: 87621237467 Scans 48</Text>

    </View>
  );
};

const styles = StyleSheet.create({
  overlayContainer: {
    position: 'absolute', // Ensures overlay sits on top
  
   
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    
    alignItems: 'center', // Center content horizontally
  },
  overlayText: {
    color: '#3C200A', // White text
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Header;