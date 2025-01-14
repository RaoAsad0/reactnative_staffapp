import { View, Text, StyleSheet, StatusBar } from 'react-native';
import React from 'react';
import Header from '../../components/header';
import { color } from '../color/color';
import CheckInAllPopUp from '../constants/checkInAllPopup';

function CheckInAllTickets() {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="white" />
            <Header />
            <CheckInAllPopUp />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.white_FFFFFF,
    },
});

export default CheckInAllTickets;