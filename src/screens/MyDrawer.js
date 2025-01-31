import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import MyTabs from '../screens/MyTabs';
import DashboardScreen from '../screens/DashboardScreen';

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false, // Hide default header
      }}
    >
      {/* Main App with Tabs Always Visible */}
      <Drawer.Screen 
        name="Home" 
        component={MyTabs} 
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
        }} 
      />

      {/* Dashboard Screen */}
      <Drawer.Screen 
        name="Dashboard" 
        component={DashboardScreen} 
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="apps" size={size} color={color} />,
        }} 
      />
    </Drawer.Navigator>
  );
}

export default MyDrawer;
