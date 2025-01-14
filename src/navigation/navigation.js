import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import MyTabs from '../screens/MyTabs'; 
import OtpLoginScreen from '../screens/OtpLoginScreen';
import TicketsTab from '../screens/TicketsTab';
import BoxOfficeTab from '../screens/BoxOfficeTab';
import CheckInAllTickets from '../screens/CheckInAllTickets';

const Stack = createNativeStackNavigator();

function LoggedInScreen() {
  return <MyTabs />;
}

function Navigation() {
  return (
    <Stack.Navigator >
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false,unmountOnBlur: true }} />
      <Stack.Screen name="LoggedIn" component={LoggedInScreen} options={{ headerShown: false,unmountOnBlur: true }} /> 
      <Stack.Screen name="OtpLogin" component={OtpLoginScreen} options={{ headerShown: false,unmountOnBlur: true }} /> 
      <Stack.Screen name="TicketsTab" component={TicketsTab} options={{ headerShown: false,unmountOnBlur: true }} /> 
      <Stack.Screen name="BoxOfficeTab" component={BoxOfficeTab} options={{ headerShown: false,unmountOnBlur: true }} /> 
      <Stack.Screen name="CheckInAllTickets" component={CheckInAllTickets} options={{ headerShown: false,unmountOnBlur: true }} /> 
    </Stack.Navigator>
  );
}

export default Navigation;