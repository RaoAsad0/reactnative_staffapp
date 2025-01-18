import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Platform, StatusBar, Dimensions } from 'react-native';
import CameraOverlay from '../../components/CameraOverlay';
import Header from '../../components/header';
import { color } from '../color/color';

const HomeScreen = () => {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [scannedData, setScannedData] = useState(null);
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
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  const handleBarCodeScanned = ({ data }) => {
    if (!scannedData) {
      setScannedData(data);
      console.log("data", data);
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
          onBarcodeScanned={({ data }) => {
            console.log("Scanned data:", data);
            setScannedData(data);
          }}
        />
        <CameraOverlay />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white_FFFFFF
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
});

export default HomeScreen;
