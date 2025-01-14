import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View,Platform,StatusBar } from 'react-native';
import CameraOverlay from '../../components/CameraOverlay';
import Header from '../../components/header';
import { color } from '../color/color';

const HomeScreen = () => {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [scannedData, setScannedData] = useState(null);
  const [activeTab, setActiveTab] = useState('CheckIn');

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
      <View style={styles.cameraWrapper}>
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
    marginHorizontal: Platform.OS === 'ios' ? '13%' : '11%',
    marginVertical: Platform.OS === 'ios' ? '30%' : '40%'
  },
  camera: {
    width: '100%',
    height: '100%',
  },
});

export default HomeScreen;
