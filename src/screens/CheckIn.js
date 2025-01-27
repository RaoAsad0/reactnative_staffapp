import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Platform, StatusBar, Dimensions } from 'react-native';
import CameraOverlay from '../../components/CameraOverlay';
import Header from '../../components/header';
import { color } from '../color/color';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { getFormattedDate } from '../constants/dateAndTime';
import NoteModal from '../constants/noteModal';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [scannedData, setScannedData] = useState(null);
  const [scanResult, setScanResult] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [scanTime, setScanTime] = useState(null);
  const [activeTab, setActiveTab] = useState('CheckIn');
  const [linePosition, setLinePosition] = useState(0);
  const [movingDown, setMovingDown] = useState(true);
  const [noteModalVisible, setNoteModalVisible] = useState(false);
  const [notes, setNotes] = useState([]);
  const [noteCount, setNoteCount] = useState(0);
  const [noteToEdit, setNoteToEdit] = useState(null);
  const { width, height } = Dimensions.get('window');

  useEffect(() => {
    setNoteCount(Object.keys(notes).length);
  }, [notes]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setLinePosition((prevPosition) => {
        if (movingDown && prevPosition >= 225) { // Reverse at the bottom
          setMovingDown(false);
          return prevPosition - 2;
        } else if (!movingDown && prevPosition <= 0) { // Reverse at the top
          setMovingDown(true);
          return prevPosition + 2;
        } else {
          return movingDown ? prevPosition + 2 : prevPosition - 2;
        }
      });
    }, 2);

    return () => clearInterval(intervalId);
  }, [movingDown]);



  const getCameraMarginVertical = () => {
    if (Platform.OS === 'ios') {
      if (width === 375) {
        // iPhone 6/7/8
        return '20%';
      } else if (width > 375 && width <= 414) {
        // iPhone 7 Plus, 8 Plus
        return '25%';
      } else {
        return '25%';
      }
    } else {
      // Android default value
      return '40%';
    }
  };

  const getCameraMarginHorizontal = () => {
    if (Platform.OS === 'ios') {
      if (width === 375) {
        // iPhone 6/7/8
        return '10%';
      } else if (width > 375 && width <= 414) {
        // iPhone 7 Plus, 8 Plus
        return '13%';
      } else {
        return '13%';
      }
    } else {
      // Android default value
      return '11%';
    }
  };

  const cameraMarginHorizontal = getCameraMarginHorizontal();
  const cameraMarginVertical = getCameraMarginVertical();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Header activeTab={activeTab} />
        requestPermission()
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  const handleBarCodeScanned = ({ data }) => {
    if (scanning) return;

    setScanning(true);
    setScannedData(data);
    setScanTime(getFormattedDate());

    if (data === '123') {
      setScanResult({
        text: 'Scan Successful',
        color: '#4BB543',
        icon: <MaterialIcons name="check" size={24} color="white" backgroundColor="#4BB543" />,
      });
    } else if (data === '456') {
      setScanResult({
        text: 'Scan Already',
        color: '#D8A236',
        icon: <MaterialIcons name="close" size={24} color="white" backgroundColor="#D8A236" />,
      });
    } else if (data === '789') {
      setScanResult({
        text: 'Scan Unsuccessful',
        color: '#ED4337',
        icon: <MaterialIcons name="close" size={24} color="white" backgroundColor="#ED4337" />,
      });
    } else {
      setScanResult({
        text: 'Invalid QR code',
        color: '#ED4337',
        icon: <MaterialIcons name="close" size={24} color="white" backgroundColor="#ED4337" />,
      });
    }
    setTimeout(() => {
      setScannedData(null);
      setScanning(false);
    }, 1000);
  };

  const handleAddNote = (newNote) => {
    if (newNote.trim().length > 0) { // Only add non-empty notes
      setNotes((prevNotes) => ({
        ...prevNotes,
        [scannedData]: newNote,
      }));
    }
    setNoteModalVisible(false); // Close the modal regardless
  };

  const handleNoteButtonPress = () => {
    if (noteCount === 1) {
      navigation.navigate('TicketScanned', {
        note: notes[scannedData] || '',
      });
    } else {
      const existingNote = notes[scannedData] || '';
      setNoteToEdit(existingNote);
      setNoteModalVisible(true);
    }
  };

  // Edit existing note
  const handleEditNote = (editedNote) => {
    setNotes((prevNotes) => ({
      ...prevNotes,
      [scannedData]: editedNote,
    }));
    setNoteModalVisible(false);
  };

  const handleDetailButtonPress = () => {
    navigation.navigate('TicketScanned', {
      note: notes[scannedData] || '',
    });
  };


  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <Header />
      <View style={[styles.cameraWrapper, { marginHorizontal: cameraMarginHorizontal, marginVertical: cameraMarginVertical }]}>
        <CameraView
          style={styles.camera}
          facing={facing}
          onBarcodeScanned={scanning ? undefined : handleBarCodeScanned}
        />
        <CameraOverlay linePosition={linePosition}
        //  scannedData={scannedData}
        />
      </View>
      {scanResult && (
        <View style={styles.containerstatus}>
          <View style={styles.scanResultsContainer}>
            <View style={[styles.scaniconresult, { backgroundColor: scanResult.color }]}>
              <MaterialIcons name={scanResult.icon.props.name} size={24} color="white" style={{ margin: 13 }} />
            </View>
            <View style={styles.scanResults}>
              <Text style={{ color: scanResult.color }}>{scanResult.text}</Text>
              <Text style={styles.timeColor}>{scanTime}</Text>
            </View>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity style={styles.detailButton} onPress={handleDetailButtonPress}>
                <Text style={styles.detailColor}>Details</Text>
              </TouchableOpacity>
              {(scanResult.text === 'Scan Unsuccessful' || scanResult.text === 'Invalid QR code' || scanResult.text === 'Scan Already') && (
                <TouchableOpacity style={styles.noteButton} onPress={handleNoteButtonPress}>
                  <Text style={styles.noteColor}>Note</Text>
                  {noteCount > 0 && (
                    <View style={styles.greyCircle}>
                      <View style={styles.redCircle}>
                        <Text style={styles.redCircleText}>{noteCount}</Text>
                      </View>
                    </View>
                  )}
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      )}
      {noteModalVisible && <NoteModal visible={noteModalVisible} onAddNote={handleAddNote} onCancel={() => setNoteModalVisible(false)} initialNote={noteToEdit} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  cameraWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 303,
    height: 301,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'black',
  },
  camera: {
    width: '100%',
    height: '100%',
  },
  containerstatus: {
    backgroundColor: 'white',
    borderColor: 'black',
    paddingRight: 16,
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 0 : 0,
    width: '100%',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 10,
  },

  scanResultsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
  },

  scanResults: {
    flexDirection: 'column',
    left: 10,
    gap: 5,
  },

  scaniconresult: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',

  },

  buttonsContainer: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'flex-end',
    flex: 1,
  },

  detailButton: {
    backgroundColor: '#AE6F28',
    borderRadius: 4,
    width: 66,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },

  noteButton: {
    backgroundColor: '#2F251D',
    borderRadius: 4,
    width: 66,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },

  redCircle: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 15,
    height: 15,
    borderRadius: 10,
    backgroundColor: '#FF2F61',
    justifyContent: 'center',
    alignItems: 'center',
  },
  greyCircle: {
    position: 'absolute',
    top: -10,
    right: -10,
    width: 25,
    height: 25,
    borderRadius: 20,
    backgroundColor: '#F6F6FA',
    justifyContent: 'center',
    alignItems: 'center',
  },

  redCircleText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },

  detailColor: {
    color: '#FFF6DF',
  },

  noteColor: {
    color: '#FFF6DF',
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
  },
  timeColor: {
    color: '#766F6A',
    fontSize: 12
  },
  noteModal: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  noteModalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  noteInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  addNoteButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
  },
});

export default HomeScreen;