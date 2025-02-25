import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import DashboardScreen from './dashboard/DashboardScreen';
import Navigation from '../navigation/navigation';
import { useNavigation } from '@react-navigation/native';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const navigation = useNavigation();

  const gotologinscreen = () => {
    navigation.navigate("Login")
  }

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerHeader}>
          <Image
            source={require('../../assets/images/Hexallo favicon.png')}
            style={styles.avatar}
          />
          <Text style={styles.userName}>Anthony Dinozo</Text>
          <Text style={styles.userEmail}>anthony@hexallo.com</Text>

          <TouchableOpacity style={styles.closeButton} onPress={() => props.navigation.closeDrawer()}>
            <Ionicons name="close" size={30} color="#333" />
          </TouchableOpacity>
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <View style={styles.footer}>
        <DrawerItem
          label="Log Out"
          onPress={gotologinscreen}
          icon={({ color, size }) => <Ionicons name="log-out" size={size} color={color} />}
          style={styles.logoutButton}
        />
      </View>
    </View>
  );
}

function MyDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen
        name="Home"
        component={Navigation}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
        }}
      />

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

const styles = StyleSheet.create({
  drawerHeader: {
    padding: 20,
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  closeButton: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  logoutButton: {
    marginLeft: 10,
  },
});
