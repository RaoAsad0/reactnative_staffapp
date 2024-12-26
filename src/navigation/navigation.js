import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import MyTabs from '../screens/MyTabs'; 

const Stack = createNativeStackNavigator();

function LoggedInScreen() {
  return <MyTabs />;
}

function Navigation() {
  return (
    <Stack.Navigator >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="LoggedIn" component={LoggedInScreen} options={{ headerShown: false }} /> 
    </Stack.Navigator>
  );
}

export default Navigation;