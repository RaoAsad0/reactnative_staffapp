import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, Image, Alert, Button, Modal } from 'react-native';
import { Camera } from 'expo-camera';

const DUMMY_TICKETS = [
  { id: 'ticket01', name: 'John Doe', email: 'john@example.com', status: 'checked-in', transactionId: 'trans123', image: 'https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=ticket01' },
  { id: 'ticket02', name: 'Jane Smith', email: 'jane@example.com', status: 'not-checked-in', transactionId: 'trans456', image: 'https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=ticket456' },
  { id: 'ticket03', name: 'Mark Johnson', email: 'mark@example.com', status: 'checked-in', transactionId: 'trans789', image: 'https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=ticket789' },
  { id: 'ticket04', name: 'Asad', email: 'Asad@example.com', status: 'checked-in', transactionId: 'trans123', image: 'https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=ticket123' },
  { id: 'ticket05', name: 'Noman Smith', email: 'Noman@example.com', status: 'not-checked-in', transactionId: 'trans456', image: 'https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=ticket456' },
  { id: 'ticket06', name: 'junaid Johnson', email: 'junaid@example.com', status: 'checked-in', transactionId: 'trans789', image: 'https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=ticket789' },
  { id: 'ticket07', name: 'fahad Doe', email: 'fahad@example.com', status: 'checked-in', transactionId: 'trans123', image: 'https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=ticket123' },
  { id: 'ticket08', name: 'adnan Smith', email: 'adnan@example.com', status: 'not-checked-in', transactionId: 'trans456', image: 'https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=ticket456' },
  { id: 'ticket09', name: 'shayan Johnson', email: 'shayan@example.com', status: 'checked-in', transactionId: 'trans789', image: 'https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=ticket789' },
  { id: 'ticket10', name: 'arham Doe', email: 'arham@example.com', status: 'checked-in', transactionId: 'trans123', image: 'https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=ticket123' },
  { id: 'ticket11', name: 'ibrahim Smith', email: 'ibrahim@example.com', status: 'not-checked-in', transactionId: 'trans456', image: 'https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=ticket456' },
  { id: 'ticket12', name: 'hafiz Johnson', email: 'hafiz@example.com', status: 'checked-in', transactionId: 'trans789', image: 'https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=ticket789' },
  { id: 'ticket13', name: 'shedrick Doe', email: 'shedrick@example.com', status: 'checked-in', transactionId: 'trans123', image: 'https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=ticket123' },
  { id: 'ticket14', name: 'imran Smith', email: 'imran@example.com', status: 'not-checked-in', transactionId: 'trans456', image: 'https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=ticket456' },
  { id: 'ticket15', name: 'hassan Johnson', email: 'hassan@example.com', status: 'checked-in', transactionId: 'trans789', image: 'https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=ticket789' },
];

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTickets, setFilteredTickets] = useState(DUMMY_TICKETS);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filteredData = DUMMY_TICKETS.filter((ticket) =>
      ticket.name.toLowerCase().includes(query.toLowerCase()) ||
      ticket.email.toLowerCase().includes(query.toLowerCase()) ||
      ticket.id.toLowerCase().includes(query.toLowerCase()) ||
      ticket.transactionId.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredTickets(filteredData);
  };

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    setModalVisible(false);

    const ticket = DUMMY_TICKETS.find((t) => t.id === data);

    if (ticket) {
      if (ticket.status === 'checked-in') {
        Alert.alert('Duplicate Ticket', 'This ticket has already been checked in.');
      } else {
        Alert.alert('Ticket Scanned Successfully', `Ticket ID: ${data}`);
        // Mark ticket as checked-in (update state for demo purposes)
        ticket.status = 'checked-in';
        setFilteredTickets([...DUMMY_TICKETS]);
      }
    } else {
      Alert.alert('Invalid Ticket', 'This ticket is not valid.');
    }
  };

  const openCamera = () => {
    setModalVisible(true);
    setScanned(false);
  };

  if (hasPermission === null) {
    return <View><Text>Requesting for camera permission...</Text></View>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const renderTicketItem = ({ item }) => (
    <View style={styles.ticketItem}>
      <Image source={{ uri: item.image }} style={styles.qrCodeImage} />
      <View style={styles.ticketDetails}>
        <Text style={styles.ticketText}>Name: {item.name}</Text>
        <Text style={styles.ticketText}>Email: {item.email}</Text>
        <Text style={styles.ticketText}>Ticket ID: {item.id}</Text>
        <Text style={styles.ticketText}>Transaction ID: {item.transactionId}</Text>
        <Text style={styles.ticketText}>Status: {item.status}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search by name, email, ticket ID or transaction ID"
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredTickets}
        keyExtractor={(item) => item.id}
        renderItem={renderTicketItem}
      />
      <View style={styles.buttonContainer}>
        <Button title="Scan QR Code" onPress={openCamera} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchBar: {
    marginTop: 30,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 20,
  },
  ticketItem: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  qrCodeImage: {
    width: 100,
    height: 100,
    marginRight: 15,
  },
  ticketDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  ticketText: {
    fontSize: 15
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  // modalContainer: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   backgroundColor: 'rgba(0,0,0,0.8)',
  // },
  // camera: {
  //   flex: 1,
  // },
  // cameraOverlay: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // scanPrompt: {
  //   color: 'white',
  //   fontSize: 18,
  // },
});

export default HomeScreen;
