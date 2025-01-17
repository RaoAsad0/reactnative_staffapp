import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, StatusBar, TouchableOpacity, FlatList } from 'react-native';
import Header from '../../components/header';
import { color } from '../color/color';
import { Image as ExpoImage } from 'expo-image';
import { attendeeslist } from '../constants/attendeeslist';

const ManualScan = () => {
  const [searchText, setSearchText] = useState('');

  // Filter tickets based on search text
  const filterTickets = () => {
    if (!searchText) return attendeeslist;
    return attendeeslist.filter(
      (attendee) =>
        attendee.id.includes(searchText) ||
        attendee.type.toLowerCase().includes(searchText.toLowerCase()) ||
        attendee.name.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  const filteredTickets = filterTickets();

  const renderItem = ({ item }) => (
    <View style={styles.ticketCard}>
      <View style={styles.ticketRow}>
        {/* Left Column */}
        <View style={styles.leftColumn}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.id}>{item.id}</Text>
        </View>

        {/* Right Column */}
        <View style={styles.rightColumn}>
          <Text style={styles.type}>{item.type}</Text>
          <Text style={styles.total}>{item.total}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <Header />
      <Text style={styles.inputLabel}>
        Enter the name, email, or phone number to{'\n'}search the ticket
      </Text>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search attendees"
          placeholderTextColor={color.placeholderTxt_24282C}
          onChangeText={(text) => setSearchText(text)}
          value={searchText}
          selectionColor={color.selectField_CEBCA0}
        />
        <TouchableOpacity>
          <ExpoImage
            source={require('../../assets/images/search-active.png')}
            style={styles.searchIcon}
          />
        </TouchableOpacity>
      </View>

      {/* FlatList */}
      <FlatList
        data={filteredTickets}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.flatListContent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No tickets found</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputLabel: {
    paddingHorizontal: 46,
    fontSize: 14,
    color: color.black_544B45,
    marginTop: 20,
    textAlign: 'center',
  },
  searchContainer: {
    backgroundColor: color.white_FFFFFF,
    borderRadius: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 20,
    borderColor: color.borderBrown_CEBCA0,
    borderWidth: 1,
    height: 45,
    marginHorizontal: 16,
  },
  searchBar: {
    flex: 1,
    paddingVertical: 10,
  },
  searchIcon: {
    width: 20,
    height: 20,
  },
  ticketCard: {
    borderWidth: 1,
    backgroundColor: color.white_FFFFFF,
    borderColor: color.white_FFFFFF,
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    marginHorizontal: 16,
  },
  ticketRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  leftColumn: {
    flex: 1,
    marginRight: 10,
  },
  rightColumn: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  name: {
    marginBottom: 5,
    fontSize: 14,
    color: '#000000',
  },
  id: {
    fontSize: 14,
    color: '#000000',
    marginTop: 5,
  },
  type: {
    fontSize: 14,
    color: '#000000',
    marginBottom: 5, // Add spacing between type and total
  },
  total: {
    fontSize: 14,
    color: '#000000',
  },
  flatListContent: {
    paddingBottom: 20,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999999',
    marginTop: 20,
  },
});

export default ManualScan;
