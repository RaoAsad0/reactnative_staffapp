import { StyleSheet, Text, View, TextInput, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { Image as ExpoImage, ImageBackground as ExpoImageBackground } from 'expo-image';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { color } from '../color/color';

const LoginScreen = () => {
  const navigation = useNavigation();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
  });

  const handleSignIn = (values) => {
    console.log('Signing in with:', values);
    navigation.navigate('OtpLogin');
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <ExpoImageBackground
        source={require('../../assets/images/bg-signup.png')}
        contentFit="cover"
        style={styles.background}
      >
        {/* Wrap everything inside a View */}
        <View style={{ flex: 1 }}>
          <View style={styles.topSection}>
            <ExpoImage
              source={require('../../assets/images/Hexallo favicon.png')}
              style={styles.image}
              contentFit="contain"
            />
            <Text style={styles.topText}>Hexallo</Text>
          </View>

          <Text style={styles.additionalText} numberOfLines={2}>
            Get Started{'\n'}to do more!
          </Text>

          <View style={styles.container}>
            <Formik
              initialValues={{ email: '' }}
              validationSchema={validationSchema}
              onSubmit={handleSignIn}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <View style={{ width: '100%' }}>
                  <Text style={styles.inputHeading}>Email or Phone Number</Text>
                  <TextInput
                    style={[styles.input, touched.email && errors.email ? styles.inputError : null]}
                    placeholder="johndoe@gmail.com"
                    placeholderTextColor={color.placeholderTxt_24282C}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    keyboardType="email-address"
                    selectionColor={color.selectField_CEBCA0}
                  />
                  {touched.email && errors.email && (
                    <Text style={styles.errorText}>{errors.email}</Text>
                  )}

                  <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Sign In</Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
          </View>
        </View>
      </ExpoImageBackground>
    </>
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
    fontWeight: 'bold',
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
    marginTop: Platform.OS === 'ios' ? 40 : 60,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: color.borderBrown_CEBCA0,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: color.btnBrown_AE6F28,
    width: '100%',
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: color.btnTxt_FFF6DF,
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputHeading: {
    color: color.black_2F251D,
    marginBottom: 10,
  },
  inputError: {
    borderColor: color.red_FF0000,
  },
  errorText: {
    color: color.red_FF0000,
    marginBottom: 10,
  },
});

export default LoginScreen;
