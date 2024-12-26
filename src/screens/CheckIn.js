import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CameraOverlay from '../../components/CameraOverlay';

const HomeScreen = () => {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [scannedData, setScannedData] = useState(null);

  if (!permission) {
   
    return <View />;
  }

  if (!permission.granted) {
   
    return (
      <View style={styles.container}>
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
      
      
      <CameraView 
        style={StyleSheet.absoluteFillObject} 
        facing={facing}
        onBarcodeScanned={({ data }) => {
          console.log("Scanned data:", data);
          setScannedData(data);
        }}
      />
      <CameraOverlay />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',  // Make sure overlay is on top of the camera view
  },
  camera: {
    ...StyleSheet.absoluteFillObject,  // Camera view should fill the screen
  },
  // buttonContainer: {
  //   flex: 1,
  //   flexDirection: 'row',
  //   backgroundColor: 'transparent',
  //   margin: 64,
  // },
  // button: {
  //   flex: 1,
  //   alignSelf: 'flex-end',
  //   alignItems: 'center',
  // },
  // text: {
  //   fontSize: 24,
  //   fontWeight: 'bold',
  //   color: 'white',
  // },
});

export default HomeScreen;
