import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, FlatList, StyleSheet } from 'react-native';
import TicketCard from '../../components/ticketCard';
import Header from '../../components/header';

const SettingsScreen = () => {
  const [tickets, setTickets] = useState([
    { id: 1, type: 'General Admission', price: 20, date: '2024-12-31'},
    { id: 2, type: 'VIP', price: 50, date: '2025-01-05'},
    // Add more dummy tickets here
  ]);
  const [searchText, setSearchText] = useState('');

  const filteredTickets = tickets.filter((ticket) =>
    ticket.id.toString().includes(searchText) ||
    ticket.type.toLowerCase().includes(searchText.toLowerCase()) ||
    ticket.date.includes(searchText)
  );

  const handleSearchChange = (text) => {
    setSearchText(text);
  };

  return (
    <SafeAreaView style={styles.container}>

   
      <TextInput
        style={styles.searchBar}
        placeholder="Search Tickets"
        onChangeText={handleSearchChange}
        value={searchText}
      />
      {filteredTickets.length > 0 && (
        <FlatList
          data={filteredTickets}
          renderItem={({ item }) => <TicketCard ticket={item} />}
          keyExtractor={(item) => item.id}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    backgroundColor: '#fff', // Adjust background color as needed
  },
 
  searchBar: {
    backgroundColor: '#eee', // Adjust background color as needed
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    paddingHorizontal: 15,
    height: 40,
  },
});

export default SettingsScreen;