// Header.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Platform, Dimensions } from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import { color } from '../src/color/color';

const Header = () => {
  const { width } = Dimensions.get('window');

  const getScanMarginLeft = () => {
    if (Platform.OS === 'ios') {
      if (width === 375) {
        // iPhone 6/7/8
        return 90;
      } else if (width > 375 && width <= 414) {
        // iPhone 7 Plus, 8 Plus
        return 125;
      } else {
        return 125;
      }
    } else {
      // Android default value
      return 120;
    }
  };
  const scanMarginLeft = getScanMarginLeft();

  return (
    <View style={styles.headerColumn}>
      <View style={styles.header}>
        <ExpoImage
          source={require('../assets/images/drawer-icon.png')} style={styles.drawerIocn} />
        <Text style={styles.countryName}>OUTMOSPHERE </Text>
        <Text style={styles.cityName}>Accra</Text>
        <Text style={styles.date}>28-12-2024</Text>
        <Text style={styles.date}>at</Text>
        <Text style={styles.time}>7:00 PM</Text>
      </View>

      <View style={styles.profileId}>
        <ExpoImage
          source={require('../assets/images/user.png')} style={styles.userIcon} />
        <Text style={styles.userId}>ID: 87621237467</Text>
        <Text style={[styles.scan, { marginLeft: scanMarginLeft }]}>Scans</Text>
        <View style={styles.count}>
          <Text style={styles.countColor}>48</Text></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerColumn: {
    flexDirection: 'column',
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    width: "100%",
    marginTop: Platform.OS === 'ios' ? 20 : 25,

  },
  profileId: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 10,
    width: "100%",
    backgroundColor: color.brown_F7E4B6

  },
  countryName: {
    color: color.brown_3C200A,
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 22,
  },
  cityName: {
    color: color.brown_3C200A,
    fontSize: 14,
    lineHeight: 22,
  },
  date: {
    color: color.brown_3C200A,
    fontSize: 14,
    lineHeight: 22,
  },
  time: {
    color: color.brown_3C200A,
    fontSize: 14,
    height: 22,
    lineHeight: 22
  },
  userId: {
    color: color.brown_3C200A,
    fontSize: 14,
    height: 22,
    marginLeft: 10,
    lineHeight: 22
  },
  drawerIocn: {
    width: 20,
    height: 22
  },
  userIcon: {
    width: 28,
    height: 28
  },
  scan: {
    left: 5
  },
  count: {
    marginLeft: Platform.OS === 'ios' ? 30 : 15,
    backgroundColor: color.black_2F251D,
    borderRadius: 4,
    width: 49,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  countColor: {
    color: color.white_FFFFFF
  }
});

export default Header;