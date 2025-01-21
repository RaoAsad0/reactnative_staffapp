import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Platform, StatusBar, Dimensions } from 'react-native';
import CameraOverlay from '../../components/CameraOverlay';
import Header from '../../components/header';
import { color } from '../color/color';
import { Image as ExpoImage } from 'expo-image';

const HomeScreen = () => {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [scannedData, setScannedData] = useState(null);
  const [scanResult, setScanResult] = useState(null);  // Store scan result text and icon
  const [activeTab, setActiveTab] = useState('CheckIn');
  const { width, height } = Dimensions.get('window');

  const getCameraMarginVertical = () => {
    if (Platform.OS === 'ios') {
      if (width === 375) {
        // iPhone 6/7/8
        return '25%';
      } else if (width > 375 && width <= 414) {
        // iPhone 7 Plus, 8 Plus
        return '30%';
      } else {
        return '30%';
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
        return '11%';
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
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  const handleBarCodeScanned = ({ data }) => {
    if (!scannedData) {
      setScannedData(data);
      console.log("Scanned data:", data);

      // Handle the scan results based on predefined QR codes
      if (data === '123') {
        setScanResult({
          text: 'Scan successful', color: "green",
          icon: <ExpoImage source={require('../../assets/images/qr-success-icon.png')} style={{ width: 24, height: 24, backgroundColor: 'green' }} />
        });
      } else if (data === '456') {
        setScanResult({
          text: 'Scan already', color: "brown",
          icon: <ExpoImage source={require('../../assets/images/cross-icon.png')} style={{ width: 24, height: 24, backgroundColor: 'brown' }} />
        });
      } else if (data === '789') {
        setScanResult({
          text: 'Scan unsuccessful', color: "red",
          icon: <ExpoImage source={require('../../assets/images/cross-icon.png')} style={{ width: 24, height: 24, backgroundColor: 'red' }} />
        });
      } else {
        setScanResult({
          text: 'Invalid QR code', color: "red",
          icon: <ExpoImage source={require('../../assets/images/cross-icon.png')} style={{ width: 24, height: 24, backgroundColor: 'red' }} />
        });
      }
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <Header />
      <View style={[styles.cameraWrapper, { marginHorizontal: cameraMarginHorizontal, marginVertical: cameraMarginVertical }]}>
        <CameraView
          style={styles.camera}
          facing={facing}
          onBarcodeScanned={handleBarCodeScanned}
        />
        <CameraOverlay />
      </View>
      {scanResult && (
  <View style={styles.containerstatus}>
    <View style={styles.scanResultsContainer}>
      <View style={styles.scaniconresult}>{scanResult.icon}</View>
      <View style={styles.scanResults}>
        <Text style={{ color: scanResult.color }}>{scanResult.text}</Text>
        <Text>28-12-2024 7:00 PM</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <View style={styles.detailButton}>
          <Text style={styles.detailColor}>Details</Text>
        </View>
        {(scanResult.text === 'Scan unsuccessful' || scanResult.text === 'Invalid QR code') && (
          <View style={styles.noteButton}>
            <Text style={styles.noteColor}>Note</Text>
          </View>
        )}
      </View>
    </View>
  </View>
)}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  borderColor: 'white',
paddingRight:16,
  position: 'absolute',
  bottom: Platform.OS === 'ios' ? 0 : 0,
  width: '100%',
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
  backgroundColor: 'red',
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
},

detailColor: {
  color: '#FFF6DF',
},

noteColor: {
  color: '#FFF6DF',
},
});

export default HomeScreen;