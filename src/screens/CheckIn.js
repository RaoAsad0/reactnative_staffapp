import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState, useEffect , useCallback } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Platform, StatusBar, Dimensions} from 'react-native';
import CameraOverlay from '../../components/CameraOverlay';
import Header from '../../components/header';
import { color } from '../color/color';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { getFormattedDate } from '../constants/dateAndTime';
import NoteModal from '../constants/noteModal';
import { useNavigation ,useFocusEffect} from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions()
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
    requestPermission();
  }, []);


  useFocusEffect(
    useCallback(() => {
      console.log('HomeScreen focused! Refreshing data...');
      // Reset your states or trigger any API fetch
      setScannedData(null);
      setScanResult(null);
      setScanning(false);
      setScanTime(null);

      return () => console.log('HomeScreen unfocused! Cleanup here.');
    }, [])
  );

  useEffect(() => {
    setNoteCount(Object.keys(notes).length);
  }, [notes]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setLinePosition((prevPosition) => {
        if (movingDown && prevPosition >= 225) { // Reverse at the bottom
          setMovingDown(false);
          return prevPosition - 2;
        } else if (!movingDown && prevPosition <= 0) {
          setMovingDown(true);
          return prevPosition + 2;
        } else {
          return movingDown ? prevPosition + 2 : prevPosition - 2;
        }
      });
    }, 2);

    return () => clearInterval(intervalId);
  }, [movingDown]);

  const getCameraMarginVertical = () => (Platform.OS === 'ios' ? '25%' : '40%');
  const getCameraMarginHorizontal = () => (Platform.OS === 'ios' ? '13%' : '11%');

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Header activeTab={activeTab} />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  }

  const handleBarCodeScanned = ({ data }) => {
    if (scanning) return;

    setScanning(true);
    setScannedData(data);
    setScanTime(getFormattedDate());

    let scanData = { text: 'Invalid QR code', color: '#ED4337', icon: 'close' };
    if (data === '123') scanData = { text: 'Scan Successful', color: '#4BB543', icon: 'check' };
    else if (data === '456') scanData = { text: 'Scanned Already', color: '#D8A236', icon: 'close' };
    else if (data === '789') scanData = { text: 'Scan Unsuccessful', color: '#ED4337', icon: 'close' };

    setScanResult(scanData);
    setTimeout(() => {
      setScannedData(null);
      setScanning(false);
    }, 1000);
  };

  const handleAddNote = (newNote) => {
    if (newNote.trim().length > 0) {
      setNotes((prevNotes) => ({
        ...prevNotes,
        [scannedData]: newNote,
      }));
    }
    setNoteModalVisible(false);
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
    navigation.navigate('TicketScanned', { note: notes[scannedData] || '' });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <Header />
      <View style={[styles.cameraWrapper, { marginHorizontal: getCameraMarginHorizontal(), marginVertical: getCameraMarginVertical() }]}>
        <CameraView
          style={styles.camera}
          facing={facing}
          onBarcodeScanned={scanning ? undefined : handleBarCodeScanned}
        />
        <CameraOverlay linePosition={linePosition} />
      </View>

      {scanResult && (
        <View style={styles.containerstatus}>
          <View style={styles.scanResultsContainer}>
            <View style={[styles.scaniconresult, { backgroundColor: scanResult.color }]}>
              <MaterialIcons name={scanResult.icon} size={24} color="white" style={{ margin: 13 }} />
            </View>
            <View style={styles.scanResults}>
              <Text style={{ color: scanResult.color }}>{scanResult.text}</Text>
              <Text style={styles.timeColor}>{scanTime}</Text>
            </View>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity style={styles.detailButton} onPress={handleDetailButtonPress}>
                <Text style={styles.detailColor}>Details</Text>
              </TouchableOpacity>
              {(scanResult.text === 'Scan Unsuccessful' || scanResult.text === 'Invalid QR code' || scanResult.text === 'Scanned Already') && (
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
    backgroundColor: color.white_FFFFFF,
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