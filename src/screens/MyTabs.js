import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {Image as ExpoImage} from 'expo-image';
import CheckIn from "./CheckIn"
import Tickets from './Tickets';
import ManualScan from "./ManualScan"

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
          } else if (route.name === 'CheckIn') {
            iconSource = focused 
            ?  require('../../assets/images/checkin-active-icon.png')
            :  require('../../assets/images/checkin-inactive-icon.png')
          } else if (route.name === 'ManualScan') {
            iconSource = focused 
            ?  require('../../assets/images/search-active.png')
            : require('../../assets/images/search-normal.png')
          }

          return <ExpoImage source={iconSource} style = {{width: 24, height: 24}} />;
        },
        tabBarActiveTintColor: '#AE6F28', // Active icon and label color
        tabBarInactiveTintColor: '#766F6A', // Inactive icon and label color
        tabBarStyle: { 
          backgroundColor: '#ffffff', // Set background color for the tab bar
          borderTopWidth: 0.7, 
          borderTopColor: '#ccc', // Add a border for visual separation
        },
      })}
      initialRouteName="CheckIn" 
    >
      <Tab.Screen name="Tickets" component={Tickets} options={{ headerShown: false }}/>
      <Tab.Screen name="CheckIn" component={CheckIn} options={{ headerShown: false }} />
      <Tab.Screen name="ManualScan" component={ManualScan} options={{ headerShown: false }}/>
    </Tab.Navigator>
  );
}

export default MyTabs;