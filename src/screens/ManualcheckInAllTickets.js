import { View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import React from 'react';
import Header from '../../components/header';
import { color } from '../color/color';
import CheckInAllPopUp from '../constants/checkInAllPopupticketList';
import { ticketslist } from '../constants/ticketslist';
import { Image as ExpoImage } from 'expo-image';

const ManualCheckInAllTickets = ({ route }) => {
    const { total } = route.params;
    console.log('Tickets List:', ticketslist);
    console.log('Total Tickets:', total);
    const displayedTickets = ticketslist.slice(0, total);
    return (
        <>
            <Header />

            <StatusBar barStyle="dark-content" backgroundColor="white" />
            <View style={styles.container}>

                <View style={styles.popUp}>
                    {/* {total > 1 && <Text style={styles.labeltickets}>Ticket(s) Purchased</Text>} */}
                    <ExpoImage
                        source={require('../../assets/images/success-icon.png')}
                        contentFit="contain"
                        style={styles.successImageIcon}
                    />

                    <Text style={styles.ticketHolder}>Ticket Holder</Text>
                    <Text style={styles.userEmail}>johndoe@gmail.com</Text>

                    {total === 1 && (
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Check-In</Text>
                        </TouchableOpacity>
                    )}
                </View>

                {/* Ticket List Section */}
                {total > 1 && (
                    <View style={styles.ticketsList}>
                        <CheckInAllPopUp ticketslist={displayedTickets} />
                    </View>
                )}
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: color.bgLight,
    },
    popUp: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 15,
        width: '100%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
        marginTop: 40,
    },
    button: {
        backgroundColor: color.btnBrown_AE6F28,
        width: '100%',
        height: 50,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: color.btnBrown_AE6F28,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: color.btnTxt_FFF6DF,
        fontSize: 16,
        fontWeight: 'bold',
    },
    labeltickets: {
        color: color.black_2F251D,
        fontSize: 16,
        fontWeight: 'bold',
    },
    ticketHolder: {
        color: color.brown_3C200A,
        fontSize: 14,
        marginTop: 20,
    },
    ticketsList: {
        marginTop: 20,
        flex: 1,
    },
    userEmail: {
        color: color.brown_3C200A,
        fontSize: 16,
        marginTop: 10,
    },
    successImageIcon: {
        width: 80,
        height: 80,
        marginTop: 20,
    },
});

export default ManualCheckInAllTickets;
