import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
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
    navigation.navigate('LoggedIn'); 
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/login-icon.png')} style={styles.logo} resizeMode="contain" />
      <Text style={styles.appName}>Hexallo</Text>

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
              {/* <View style={styles.circle}>
                  <Text style={styles.circleText}>H</Text>
              </View> */}
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
    // circle:{
    //     width: 50,
    //     height: 50,
    //     borderRadius: 50/2,
    //     backgroundColor: '#9370DB',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     marginTop: 20,
    // },
    // circleText:{
    //     color: '#fff',
    //     fontSize: 20,
    //     fontWeight: 'bold',
    // },
  inputError: {
    borderColor: color.red_FF0000,
  },
  errorText: {
    color: color.red_FF0000,
    marginBottom: 10,
  },
    container: {
        flex: 1,
        backgroundColor: color.white_FFFFFF,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 10,
    },
    appName: {
        color: color.brown_3C200A,
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 20,
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
    }
});

export default LoginScreen;