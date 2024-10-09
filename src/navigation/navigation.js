// src/Navigation.js
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';


const Stack = createNativeStackNavigator();

const Navigation = () => {
  const [isLoading, setIsLoading] = useState(true); // To show the splash screen

  useEffect(() => {
    const checkLoginStatus = () => {
      setIsLoading(false);  // Set loading to false to hide splash screen
    };

    checkLoginStatus();
  }, []);

  if (isLoading) {
    // Default Expo splash screen will automatically show here
    return null; // Returning null lets the splash screen display until the JS is loaded
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
     
         <Stack.Screen
           options={{ headerShown: false }}
           name="Login"
           component={LoginScreen}
         />
    
         <Stack.Screen
           options={{ headerShown: false }}
           name="Home"
           component={HomeScreen}
         />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;