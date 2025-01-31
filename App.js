import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from "./src/navigation/navigation"

import MyTabs from './src/screens/MyTabs';

function App() {
  return (
    <NavigationContainer>
      <Navigation />
    </NavigationContainer>
  );
}

export default App;
