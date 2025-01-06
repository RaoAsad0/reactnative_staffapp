import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Image as ExpoImage, ImageBackground as ExpoImageBackground } from 'expo-image';
import { useNavigation } from '@react-navigation/native';
import { color } from '../color/color';

const OtpLoginScreen = () => {
  const navigation = useNavigation();
  const [otpResendTime, setOtpResendTime] = useState(60);
  const [otp, setOtp] = useState(['', '', '', '', '']);
  const inputRefs = useRef([]); // Create a ref array for OTP inputs

  const handleSignIn = () => {
    const enteredOtp = otp.join('');
    console.log('Signing in with OTP:', enteredOtp);
    if (enteredOtp.length === 5) {
      navigation.navigate('LoggedIn');
    } else {
      console.log('Invalid OTP');
    }
  };

  const handleResendOtp = () => {
    console.log('Resending OTP');
    setOtpResendTime(60);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (otpResendTime > 0) {
        setOtpResendTime((prevTime) => prevTime - 1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [otpResendTime]);

  const handleOtpChange = (value, index) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    // Move to next field if a digit is entered
    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (event, index) => {
    if (event.nativeEvent.key === 'Backspace' && !otp[index]) {
      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
        const updatedOtp = [...otp];
        updatedOtp[index - 1] = '';
        setOtp(updatedOtp);
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ExpoImageBackground
        source={require('../../assets/images/bg-signup.png')}
        contentFit="cover"
        style={styles.background}
      >
        <View style={styles.topSection}>
          <ExpoImage source={require('../../assets/images/Hexallo favicon.png')} style={styles.image} contentFit="contain" />
          <Text style={styles.topText}>Hexallo</Text>
        </View>

        <Text style={styles.additionalText} numberOfLines={2}>
          Get Started{'\n'}to do more!
        </Text>

        <View style={styles.container}>
          <Text style={styles.appName}>Enter OTP</Text>

          <Text style={styles.labelText}>
            Otp sent to your email
            {otpResendTime > 0 ? (
              <Text style={{ color: color.gray }}> (Resend in {otpResendTime}s)</Text>
            ) : (
              <TouchableOpacity onPress={handleResendOtp}>
                <Text style={styles.resendText}></Text>
              </TouchableOpacity>
            )}
          </Text>

          {/* <Text style={styles.otpText}>OTP</Text> */}

          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                style={styles.otpInput}
                value={digit} // Show `-` if the input is empty
                maxLength={1}
                keyboardType="numeric"
                onChangeText={(value) => handleOtpChange(value, index)}
                onKeyPress={(event) => handleKeyPress(event, index)}
                ref={(ref) => (inputRefs.current[index] = ref)} // Assign the ref
                selectionColor={color.selectField_CEBCA0}
              />
            ))}
          </View>

          <Text style={styles.labelText}>Did't receive OTP code?</Text>

          <TouchableOpacity style={styles.button} onPress={handleSignIn}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.changeDetailsButton} onPress={handleResendOtp}>
            <Text style={styles.changeDetailsText}>Resend OTP</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.changeDetailsButton}>
            <Text style={styles.changeDetailsText}>Change OTP Details</Text>
          </TouchableOpacity>
        </View>
      </ExpoImageBackground>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    padding: 50,
    paddingHorizontal: 20,
  },
  image: {
    width: 50,
    height: 50,
  },
  topSection: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    fontSize: 15,
  },
  additionalText: {
    marginTop: 40,
    color: color.white_FFFFFF,
    width: '90%',
    lineHeight: 50,
    fontSize: 40,
    fontWeight: 'bold',
  },
  topText: {
    color: color.lightBrown_FFF6DF,
    marginStart: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    marginTop: 40,
  },
  appName: {
    color: color.brown_3C200A,
    fontSize: 20,
    fontWeight: 'bold',

  },
  labelText: {
    color: color.black_544B45,
    textAlign: 'center',
    fontSize: 14,
    marginBottom: 10,
  },
  otpText: {
    width: '100%',
    textAlign: 'left',
    fontSize: 16,
    marginBottom: 10,
  },
  otpContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  otpInput: {
    width: 40,
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
    textAlign: 'center',
    fontSize: 18,
    borderColor: color.borderBrown_CEBCA0,
  },
  changeDetailsButton: {
    width: '100%',
    height: 50,
    borderColor: color.borderBrown_CEBCA0,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  changeDetailsText: {
    color: color.black_2F251D,
    fontWeight: "bold"
  },
  button: {
    backgroundColor: color.btnBrown_AE6F28,
    width: '100%',
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: color.btnBrown_AE6F28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: color.btnTxt_FFF6DF,
    fontSize: 16,
    fontWeight: 'bold',
  },
  resendText: {
    color: color.blue,
  },
});

export default OtpLoginScreen;