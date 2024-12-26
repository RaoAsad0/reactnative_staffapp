import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CheckIn from "./CheckIn"
import Tickets from './Tickets';
import ManualScan from "./ManualScan"

const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator 
          initialRouteName="CheckIn"
        >
          <Tab.Screen name="Tickets" component={Tickets} />
          <Tab.Screen name="CheckIn" component={CheckIn} />
          <Tab.Screen name="ManualScan" component={ManualScan} />
        </Tab.Navigator>
      );
}

export default MyTabs;