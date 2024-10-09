// LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleLogin = () => {
    setLoading(true); // Set loading state

    // Hardcoded credentials
    const validEmail = "staff";
    const validPassword = "123";

    if (email === validEmail && password === validPassword) {
      // Successful login
      navigation.navigate('Home'); // Navigate to Home screen
    } else {
      // Failed login
      Alert.alert("Invalid Credentials", "The email or password is incorrect.");
    }

    setLoading(false); // Reset loading state
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Text>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />
      <Text>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
        secureTextEntry
        style={styles.input}
      />
      <Button title={loading ? 'Logging in...' : 'Login'} onPress={handleLogin} disabled={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    width: '100%', // Optional: Set width to fill the container
  },
});

export default LoginScreen;
