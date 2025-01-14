import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const overlayWidth = width * 0.8;
const overlayHeight = overlayWidth;

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
            <View style={styles.frame}>
                {marker('#AE6F28', '100%', '20%', 5, 10)}
                <Text style={styles.instructionText}>Align QR Code in the frame</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    overlayContainer: {
        position: 'absolute',
        width: 303,
        height: 301,
        justifyContent: 'center',
        alignItems: 'center',
    },
    frame: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    instructionText: {
        color: '#AE6F28',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        position: 'absolute',
    },
});

export default CameraOverlay;
