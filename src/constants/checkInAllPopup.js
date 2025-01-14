import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Image as ExpoImage, ImageBackground as ExpoImageBackground } from 'expo-image';
import { useNavigation } from '@react-navigation/native';
import { color } from '../color/color';

const CheckInAllPopup = () => {

  return (
        <View style={styles.container}>
        <View style={styles.ticketContainer}>
            <View>
                <Text style={styles.ticketheading}>Ticket ID</Text>
                <Text style={styles.ticketId}>447575765765</Text>
                <Text style={styles.ticketType}>Standard</Text>
                <View style={styles.priceContainer}>
                    <Text style={styles.priceCurrency}>USD</Text>
                    <Text style={styles.ticketPrice}>40</Text>
                </View>
                <Text style={styles.ticketDateheading}>Date:</Text>
                <Text style={styles.ticketDate}>23-12-24</Text>
            </View>
           
        </View>
        </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white_FFFFFF,
  },
  ticketContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: color.white_FFFFFF,
    borderRadius: 10,
    borderColor: color.white_FFFFFF,
    marginBottom: 10,
    backgroundColor: color.white_FFFFFF,
    paddingHorizontal: 16,
    paddingVertical: 10

},
ticketId: {
    fontWeight: 'bold',
    marginTop: 10,
    fontSize: 14
},
ticketType: {
    fontSize: 14,
    marginTop: 10
},
priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10
},
priceCurrency: {
    color: color.black_544B45,
},
ticketPrice: {
    color: color.black_2F251D,
    fontWeight: 'bold',
},
ticketDate: {
    fontSize: 16,
    color: color.black_544B45,
    fontWeight: 'bold',
    marginTop: 10
},
ticketheading: {
    fontSize: 20,
    color: color.black_544B45,
},
ticketDateheading: {
    fontSize: 16,
    marginTop: 10
},
});

export default CheckInAllPopup;