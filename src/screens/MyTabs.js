import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {Image as ExpoImage} from 'expo-image';
import CheckIn from "./CheckIn"
import Tickets from './Tickets';
import ManualScan from "./ManualScan"
import { color } from '../color/color';
import { View } from 'react-native';
const Tab = createBottomTabNavigator();

function MyTabs() {
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconSource;

          if (route.name === 'Tickets') {
            iconSource = focused 
            ? require('../../assets/images/ticket-active-icon.png')
            : require('../../assets/images/ticket-inactive-icon.png')
          } else if (route.name === 'Check In') {
            iconSource = focused 
            ?  require('../../assets/images/checkin-active-icon.png')
            :  require('../../assets/images/checkin-inactive-icon.png')
          } else if (route.name === 'Manual Scan') {
            iconSource = focused 
            ?  require('../../assets/images/search-active.png')
            : require('../../assets/images/search-normal.png')
          }

          return <ExpoImage source={iconSource} style={{ width: 24, height: 24,marginTop:5}} />;
        },
        tabBarLabelStyle: { 
          fontSize: 12,  
          marginTop: 8, 
        
        },
        tabBarActiveTintColor: color.btnBrown_AE6F28,
        tabBarInactiveTintColor: color.brown_766F6A, 
        tabBarStyle: { 
          height: 66,  // Increase height of the tab bar
          paddingVertical: 10, // Adjust vertical spacing
          justifyContent: "center", // Center content
          backgroundColor: color.white_FFFFFF,
          borderTopWidth: 0.7, 
          borderTopColor: '#ccc',
          shadowColor: color.white_FFFFFF,  // Remove shadow effect on press
          elevation: 0,                 // Remove Android shadow
        },
        tabBarPressColor: color.white_FFFFFF, // Removes the grey touch effect
        tabBarPressOpacity: 0,         // Smooth press effect
      })}
      initialRouteName="Check In" 
    >
      <Tab.Screen name="Tickets" component={Tickets} options={{ headerShown: false,unmountOnBlur: true }}/>
      <Tab.Screen name="Check In" component={CheckIn} options={{ headerShown: false,unmountOnBlur: true }}/>
      <Tab.Screen name="Manual Scan" component={ManualScan} options={{ headerShown: false,unmountOnBlur: true }}/>
    </Tab.Navigator>
  );
}

export default MyTabs;