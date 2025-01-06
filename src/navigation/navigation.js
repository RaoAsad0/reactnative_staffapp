import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import MyTabs from '../screens/MyTabs'; 
import OtpLoginScreen from '../screens/OtpLoginScreen';

const Stack = createNativeStackNavigator();

function LoggedInScreen() {
  return <MyTabs />;
}

function Navigation() {
  return (
    <Stack.Navigator >
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="LoggedIn" component={LoggedInScreen} options={{ headerShown: false }} /> 
      <Stack.Screen name="OtpLogin" component={OtpLoginScreen} options={{ headerShown: false }} /> 
    </Stack.Navigator>
  );
}

export default Navigation;