import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Image as ExpoImage } from 'expo-image';

const TicketCard = ({ ticket }) => {
  // Ensure qrCode is valid
  const isValidQrCode = ticket.qrCode && ticket.qrCode.trim() !== '';

  return (
    <View style={styles.ticketCard}>
      <View style={styles.ticketDetails}>
        <Text style={styles.ticketId}>Ticket ID: {ticket.id}</Text>
        <Text style={styles.ticketType}>{ticket.type}</Text>
        <Text style={styles.ticketPrice}>USD{ticket.price}</Text>
        <Text style={styles.ticketDate}>Date: {ticket.date}</Text>
      </View>

      
      {/* Display "Scanned" or "Unscanned" label based on ticket.status */}
    </View>
  );
};

const styles = StyleSheet.create({
  ticketCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 15,
  },
  ticketDetails: {
    flexDirection: 'column',
  },
  ticketId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  ticketType: {
    fontSize: 14,
    color: '#666',
  },
  ticketPrice: {
    fontSize: 14,
    color: '#666',
  },
  ticketDate: {
    fontSize: 14,
    color: '#666',
  },
  qrCodeContainer: {
    alignItems: 'flex-end',
    marginTop: 10,
  },
  qrCode: {
    width: 80,
    height: 80,
  },
  noQrText: {
    fontSize: 14,
    color: '#999',
  },
});

export default TicketCard;
