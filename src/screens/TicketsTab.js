import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Platform, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { color } from '../color/color';
import { Image as ExpoImage } from 'expo-image';

const TicketsTab = ({ tickets }) => {
    const [searchText, setSearchText] = useState('');
    const [selectedTab, setSelectedTab] = useState('All');
    const { width } = Dimensions.get('window');

    const getStatusBtnLeft = () => {
        if (Platform.OS === 'ios') {
            if (width === 375) {
                // iPhone 6/7/8
                return 225;
            } else if (width > 375 && width <= 414) {
                // iPhone 7 Plus, 8 Plus
                return 260;
            } else {
                return 260;
            }
        } else {
            // Android default value
            return 240;
        }
    };

    const statusBtnLeft = getStatusBtnLeft();

    const filterTickets = () => {
        let filteredTickets = tickets;
        if (searchText) {
            filteredTickets = tickets.filter(
                (ticket) =>
                    ticket.id.includes(searchText) ||
                    ticket.type.toLowerCase().includes(searchText.toLowerCase()) ||
                    ticket.date.includes(searchText)
            );
        }

        if (selectedTab !== 'All') {
            filteredTickets = filteredTickets.filter((ticket) => ticket.status === selectedTab);
        }
        return filteredTickets;
    };

    const handleSearchChange = (text) => {
        setSearchText(text);
    };

    const handleTabPress = (tab) => {
        setSelectedTab(tab);
    };

    const renderItem = ({ item }) => (
        <View style={styles.ticketContainer}>
            <View>
                <Text style={styles.ticketheading}>Ticket ID</Text>
                <Text style={styles.ticketId}>{item.id}</Text>
                <Text style={styles.ticketType}>{item.type}</Text>
                <View style={styles.priceContainer}>
                    <Text style={styles.priceCurrency}>USD</Text>
                    <Text style={styles.ticketPrice}>{item.price}</Text>
                </View>
                <Text style={styles.ticketDateheading}>Date:</Text>
                <Text style={styles.ticketDate}>{item.date}</Text>
            </View>
            <View
                style={[
                    styles.statusBtn,
                    { left: statusBtnLeft }
                ]}
            >
                <TouchableOpacity
                    style={[
                        styles.statusButton,
                        item.status === 'Scanned' && styles.scannedButton,
                        item.status === 'Unscanned' && styles.unscannedButton,
                    ]}
                >
                    <Text
                        style={[
                            styles.statusButtonText,
                            item.status === 'Scanned' && styles.scannedButtonText,
                            item.status === 'Unscanned' && styles.unscannedButtonText,
                        ]}
                    >
                        {item.status}
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.imageContainer}>
                {item.imageUrl && (
                    <ExpoImage source={item.imageUrl} style={styles.ticketImage} contentFit='cover' />
                )}
            </View>
        </View>
    );

    const filteredTickets = filterTickets();

    const totalTickets = tickets.length;
    const scannedTicketsCount = tickets.filter((ticket) => ticket.status === 'Scanned').length;
    const unscannedTicketsCount = tickets.filter((ticket) => ticket.status === 'Unscanned').length;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.searchContainer}>
                <View style={styles.searchBarContainer}>
                    <TextInput
                        style={styles.searchBar}
                        placeholder="John Doe"
                        placeholderTextColor={color.placeholderTxt_24282C}
                        onChangeText={handleSearchChange}
                        value={searchText}
                        selectionColor={color.selectField_CEBCA0}
                    />
                </View>

                <TouchableOpacity onPress={() => handleSearchChange(searchText)}>
                    <ExpoImage source={require('../../assets/images/search-active.png')} style={styles.searchIcon} />
                </TouchableOpacity>
            </View>

            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[styles.tabButton, selectedTab === 'All' && styles.activeTab]}
                    onPress={() => handleTabPress('All')}
                >
                    <Text style={[styles.tabButtonText, selectedTab === 'All' && styles.activeTabText]}>All ({totalTickets})</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tabButton, selectedTab === 'Scanned' && styles.activeTab]}
                    onPress={() => handleTabPress('Scanned')}
                >
                    <Text style={[styles.tabButtonText, selectedTab === 'Scanned' && styles.activeTabText]}>Scanned ({scannedTicketsCount})</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tabButton, selectedTab === 'Unscanned' && styles.activeTab]}
                    onPress={() => handleTabPress('Unscanned')}
                >
                    <Text style={[styles.tabButtonText, selectedTab === 'Unscanned' && styles.activeTabText]}>Unscanned ({unscannedTicketsCount})</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={filteredTickets}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    ticketContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: color.white_FFFFFF,
        borderRadius: 10,
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
    statusButton: {
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        width: 110,
    },
    scannedButton: {
        backgroundColor: color.brown_FFE8BB,
    },
    unscannedButton: {
        backgroundColor: color.grey_87807C33,
    },
    statusButtonText: {
        fontWeight: 'bold',
        textAlign: 'center',
    },
    scannedButtonText: {
        color: color.brown_D58E00,
    },
    unscannedButtonText: {
        color: color.black_544B45,
    },
    statusBtn: {
        position: 'absolute',
        top: 15,

    },
    searchContainer: {
        backgroundColor: color.white_FFFFFF,
        borderRadius: 10,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: Platform.OS === 'ios' ? -25 : -25,
        borderColor: color.borderBrown_CEBCA0,
        borderWidth: 1,
        height: 45,
    },
    searchBarContainer: {
        flex: 1,
    },
    searchBar: {
        flex: 1,
        paddingVertical: 10,
        fontWeight: '500',
        fontSize: 13,
    },
    searchIcon: {
        width: 20,
        height: 20,
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingVertical: 10,
    },
    tabButton: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        marginRight: 10,
        padding: 5
    },
    activeTab: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 7,
        backgroundColor: 'white',
        marginRight: 10,
    },
    tabButtonText: {
        color: color.brown_766F6A
    },
    activeTabText: {
        color: color.brown_3C200A,
        fontWeight: 'bold',
    },
    imageContainer: {
        width: 100,
        height: 100,
        marginRight: 5,
        marginTop: 70
    },
    ticketImage: {
        width: '100%',
        height: '100%',
    },

});

export default TicketsTab;