import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const overlayWidth = width * 0.8; // Adjust this for overlay size
const overlayHeight = overlayWidth; // Make it square

// Function for drawing the marker (QR frame)
function marker(color, size, borderLength, thickness = 2, borderRadius = 0) {
    return (
        <View style={{ height: size, width: size }}>
            <View
                style={{
                    position: 'absolute',
                    height: borderLength,
                    width: borderLength,
                    top: 0,
                    left: 0,
                    borderColor: color,
                    borderTopWidth: thickness,
                    borderLeftWidth: thickness,
                    borderTopLeftRadius: borderRadius,
                }}
            />
            <View
                style={{
                    position: 'absolute',
                    height: borderLength,
                    width: borderLength,
                    top: 0,
                    right: 0,
                    borderColor: color,
                    borderTopWidth: thickness,
                    borderRightWidth: thickness,
                    borderTopRightRadius: borderRadius,
                }}
            />
            <View
                style={{
                    position: 'absolute',
                    height: borderLength,
                    width: borderLength,
                    bottom: 0,
                    left: 0,
                    borderColor: color,
                    borderBottomWidth: thickness,
                    borderLeftWidth: thickness,
                    borderBottomLeftRadius: borderRadius,
                }}
            />
            <View
                style={{
                    position: 'absolute',
                    height: borderLength,
                    width: borderLength,
                    bottom: 0,
                    right: 0,
                    borderColor: color,
                    borderBottomWidth: thickness,
                    borderRightWidth: thickness,
                    borderBottomRightRadius: borderRadius,
                }}
            />
        </View>
    );
}

const CameraOverlay = () => {
    return (
        <View style={styles.overlayContainer}>
            {/* Full-screen transparent black overlay */}
            <View style={styles.overlay} />
            
            <View style={styles.row}>
                {/* Left and Right transparent black space */}
                <View style={[styles.overlay, { flex: 1 }]} />
                
                {/* QR code frame */}
                <View style={styles.frame}>
                    {marker('#AE6F28', '80%', '20%', 5, 10)}
                    <Text style={styles.instructionText}>Align QR Code in the frame</Text>
                </View>
                
                {/* Left and Right transparent black space */}
                <View style={[styles.overlay, { flex: 1 }]} />
            </View>
            
            {/* Full-screen transparent black overlay */}
            <View style={styles.overlay} />
        </View>
    );
};

const styles = StyleSheet.create({
    // Ensure the overlay fills the entire screen
    overlayContainer: {
        position: 'absolute',  // Ensures it's over the whole screen
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,  // Ensure it's above other UI elements
    },
    // Full screen overlay with transparent black
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0)',  // Transparent black overlay
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    // Frame for QR code centered in the overlay
    frame: {
        width: overlayWidth,
        height: overlayHeight,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    instructionText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        position: 'absolute',
    },
});

export default CameraOverlay;
