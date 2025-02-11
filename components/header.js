import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import { color } from '../../color/color';

const OverallStatistics = () => {
    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                {/* Heading */}
                <Text style={styles.heading}>Overall Statistics</Text>

                {/* First Row */}
                <View style={styles.row}>
                    <View style={styles.statContainer}>
                        <View style={styles.statRow}>
                            <ExpoImage source={require('../../../assets/images/drawer-icon.png')} style={styles.icon} />
                            <Text style={styles.statTitle}>Total Tickets</Text>
                        </View>
                        <Text style={styles.statValue}>545</Text>
                    </View>

                    <View style={styles.statContainer}>
                        <View style={styles.statRow}>
                            <ExpoImage source={require('../../../assets/images/drawer-icon.png')} style={styles.icon} />
                            <Text style={styles.statTitle}>Total Scanned</Text>
                        </View>
                        <Text style={styles.statValue}>345</Text>
                    </View>
                </View>

                {/* Second Row */}
                <View style={styles.row}>
                    <View style={styles.statContainer}>
                        <View style={styles.statRow}>
                            <ExpoImage source={require('../../../assets/images/drawer-icon.png')} style={styles.icon} />
                            <Text style={styles.statTitle}>Total Unscanned</Text>
                        </View>
                        <Text style={styles.statValue}>200</Text>
                    </View>

                    <View style={styles.statContainer}>
                        <View style={styles.statRow}>
                            <ExpoImage source={require('../../../assets/images/drawer-icon.png')} style={styles.icon} />
                            <Text style={styles.statTitle}>Available Tickets</Text>
                        </View>
                        <Text style={styles.statValue}>80</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10
    },
    wrapper: {
        marginTop: 20,
        padding: 16,
        paddingHorizontal: 15,
        backgroundColor: color.white_FFFFFF,
        borderColor: color.white_FFFFFF,
        borderRadius: 16,
        elevation: 3,
        marginBottom: 20,
        borderWidth: 1,
        margin: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 5,
    },
    heading: {
        fontSize: 16,
        fontWeight: '500',